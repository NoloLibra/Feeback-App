import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    // const [feedback, setFeedback] = useState([
    //     {
    //         id: 1,
    //         text: 'This item is feeback item 1',
    //         rating:10
    //     },
    //     {
    //         id: 2,
    //         text: 'This item is feeback item 2',
    //         rating:9
    //     },
    //     {
    //         id: 3,
    //         text: 'This item is feeback item 3',
    //         rating:7
    //     }
    // ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()


        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure?')) {
            await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })

        const data = await response.json()
        setFeedback([data,...feedback])
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json()
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...data} : item
            ))
        )
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        isLoading,
        updateFeedback
    }}>
    {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;