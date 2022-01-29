import Avatar from "../../components/Avatar";
import {useFirestore} from "../../hooks/useFirestore";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useHistory} from 'react-router-dom'


export default function ProjectSummary({project}) {
    const {deleteDocument, response} = useFirestore('projects')
    const {user} = useAuthContext();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        deleteDocument(project.id)
        history.push('/')
    }


    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">{project.dueDate.toDate().toDateString()}</p>
                <p className="details">{project.details}</p>
                <p className='details'>project created by: {project.createdBy.displayName}</p>
                <h4>project assigned to: </h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoUrl}/>
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                <button className="btn" onClick={handleClick}>Complete project</button>
            )}
        </div>
    );
};
