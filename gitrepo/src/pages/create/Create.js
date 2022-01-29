import './Create.css'
import {useEffect, useState} from "react";
import Select from "react-select";
import {useCollection} from "../../hooks/useCollection";
import {timestamp} from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import {useHistory} from 'react-router-dom';

//options for select categories
const categories = [
    {value: 'design', label: 'Design'},
    {value: 'development', label: 'Development'},
    {value: 'marketing', label: 'Marketing'},
    {value: 'sales', label: 'Sales'}
]

export default function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);


    const {documents} = useCollection('users');
    const [users, setUsers] = useState([]);
    const {user} = useAuthContext();
    const {addDocument, response} = useFirestore('projects');
    const history = useHistory();


    //create options for select users
    useEffect(() => {
        if (documents){
            setUsers(documents.map(user => {
                return {value: {...user, id: user.id}, label: user.displayName}
            }))
        }
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!category){
            setFormError('select project category')
            return
        }
        if (assignedUsers.length < 1){
            setFormError('assign at least 1 user')
            return
        }

        //create project data for db
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoUrl: u.value.photoUrl,
                id: u.value.id
            }
        })
        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        //add to db
        await addDocument(project)
        if (!response.error){
            history.push('/')
        }

    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>create new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input required
                           type="text"
                           onChange={(e) => setName(e.target.value)}
                           value = {name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea required
                           type="text"
                           onChange={(e) => setDetails(e.target.value)}
                           value = {details}
                    ></textarea>
                </label>
                <label>
                    <span>Set due date:</span>
                    <input required
                           type="date"
                           onChange={(e) => setDueDate(e.target.value)}
                           value = {dueDate}
                    />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select onChange={(option)=>setCategory(option)}
                            options={categories} />
                </label>
                <label>
                    <span>assign to:</span>
                    <Select
                        onChange={(option)=> setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className='btn'>Add project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}