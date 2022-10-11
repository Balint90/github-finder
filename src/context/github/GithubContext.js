import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false
    } 

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get initial users (testing purposes)
    const fetchUsers = async () => { 
        setLoading()
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
        
        setLoading()

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

    //Get a single user
    const getUser = async (login) => { 
        
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`,
        {
            method: "GET",
            // headers: {
            //     Authorization: `token ${GITHUB_TOKEN}`
            // }
        })

        if (response.status === 404) {
            window.location = '/notfound'
        }
        else {
            const data = await response.json()

            console.log(data)

            dispatch({
                type: 'GET_USER',
                payload: data,
            })
        }
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
        user: state.user,
        fetchUsers, 
        searchUsers,
        clearUsers,
        getUser
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext