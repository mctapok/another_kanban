import './Project.css'
import {useParams} from 'react-router-dom'
import {useDocument} from "../../hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

export default function Project(){
    const{id} = useParams();
    const { error, document} = useDocument('projects', id);

    return (
        <div className='project-details'>
            {error && <div className='error'>{error}</div>}
            {!document && !error && <p className='loading'>Loading...</p>}
            {document && (
                <>
                    <div>
                        <h1>{document.name}</h1>
                        <ProjectSummary project={document}/>
                    </div>
                    <ProjectComments project={document}/>
                </>
            )}

        </div>
    )
}