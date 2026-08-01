import dns from "dns";
import mongoose from "mongoose";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function resolveSrvConnectionString(uri) {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/(.*)$/);
    if (match) {
      const [, user, pass, host, rest] = match;
      const srvRecords = await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
      let txtOpts = "authSource=admin";
      try {
        const txtRecords = await dns.promises.resolveTxt(host);
        if (txtRecords?.[0]) txtOpts = txtRecords[0].join("&");
      } catch (_) {}

      if (srvRecords && srvRecords.length > 0) {
        const hosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(",");
        const querySep = rest.includes("?") ? "&" : "?";
        return `mongodb://${user}:${pass}@${hosts}/${rest}${querySep}${txtOpts}&ssl=true`;
      }
    }
  } catch (err) {
    console.warn("SRV resolution fallback trigger:", err.message);
  }
  return uri;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };

    cached.promise = (async () => {
      const connectionString = await resolveSrvConnectionString(MONGODB_URI);
      return mongoose.connect(connectionString, opts);
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;


