import { useLocation } from "react-router-dom";

function CourseDetailsPage(){
    const location = useLocation();
    const coursesData = location.state?.course;
    console.log(coursesData);
    return(
        <div className="h-screen mt-25 justify-center text-center">
            <h1 className="text-2xl">{coursesData.name}</h1>
            <p>{coursesData.description}</p>
            <p>Fees:{coursesData.fees}</p>
            <p>Students:{coursesData.students}</p>
            <a href={coursesData.link} className="text-blue-700 underline">link</a>
        </div>
    )
}
export default CourseDetailsPage;