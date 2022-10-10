import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: true
    } 

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get initial users (testing purposes)
    const fetchUsers = async () => { 
        setLoading(true)
        const response = await fetch(`${GITHUB_URL}/users`,
        {
            method: "GET",
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        }
        )

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    //Get search results
    const searchUsers = async (text) => { 
        
        setLoading(true)

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
        {
            method: "GET",
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        }
        )

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    //Clear search results
    const clearUsers = () => dispatch({
            type: 'CLEAR_USERS'
        })

    //Set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'});

    return <GithubContext.Provider value={{
        users: state.users, 
        loading: state.loading, 
        fetchUsers, 
        searchUsers,
        clearUsers}}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext