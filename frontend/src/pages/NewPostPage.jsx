import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

function NewPostPage() {
	const navigate = useNavigate()
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState(null)

	async function handleSubmit(e) {
		e.preventDefault()
		setSubmitting(true)
		setError(null)

		try {
			const form = e.target

			const newPost = {
				title: form.title.value,
				author: form.author.value,
				content: form.content.value,
			}

			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPost),
			})

			if (!response.ok) {
				throw new Error('Failed to create a post')
			}
			const data = await response.json()

			const postID = data._id

			navigate(`/posts/${postID}`)
		} catch (err) {
			setError(err.message)

			setSubmitting(false)
		}
	}

	return (
		<div>
			<h1 className='page-title'>New post</h1>
			{error && <p className='status-msg error'>{error}</p>}
			<PostForm onSubmit={handleSubmit} submitting={submitting} />
		</div>
	)
}

export default NewPostPage
