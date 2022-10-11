import React from 'react'
import { FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { useEffect, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'

function User() {
    const {getUser, user, loading} = useContext(GithubContext)

    const params = useParams()

    // console.log(params)

    useEffect(() => {
        getUser(params.login)
    }, [])

    //destructure
    const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    type
    } = user

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to='/' className='btn btn-ghost'>
                        Back to Search
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="Profile image" />
                            </figure>
                            <div className="card-body justify-end">
                                <h2 className="card-title mb-0">{name}</h2>
                                <p>{login}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="mb-6">
                            <h2 className="text-xl card-title mb-4">
                                {name}
                                <div className="ml-2 mr-2 badge badge-success">
                                    {type}
                                </div>
                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                            </h2>
                            <p>{bio}</p>
                            <mt-4 className="card-actions">
                                <a href={html_url} target="_blank" rel="noreferrer" className='btn btn-outline'>
                                    Visit Github Profile
                                </a>
                            </mt-4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User