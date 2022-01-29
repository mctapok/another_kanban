import './Dashboard.css'
import {useCollection} from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";

export default function Dashboard() {
    const {user} = useAuthContext();
    const {documents, error} = useCollection('projects');
    const [filter, setFilter] = useState('all');

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (filter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'marketing':
            case 'sales':
                return document.category === filter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className='page-title'>dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents && <ProjectFilter changeFilter={changeFilter} />}
            {projects && <ProjectList projects={projects}/>}
        </div>
    )
}