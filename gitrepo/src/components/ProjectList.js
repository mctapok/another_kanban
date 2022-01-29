import './ProjectList.css'
import {Link} from "react-router-dom";
import Avatar from "./Avatar";


export default function ProjectList({projects}){
    return (
        <div className='project-list'>
            {projects.length === 0 && <p>Project list is empty</p>}
            {projects.map((project) =>(
                    <Link to={`/projects/${project.id}`}key={project.id}>
                        <h4>{project.name}</h4>
                        <p>Due by {project.dueDate.toDate().toDateString()}</p>
                        <div className='assigned-to'>
                            <ul>
                                {project.assignedUsersList.map((user => (
                                  <li key={user.id}>
                                      <Avatar src={user.photoUrl}/>
                                  </li>
                                )))}
                            </ul>
                        </div>
                    </Link>
                ))}
        </div>
    );
};
