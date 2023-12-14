import { format, formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import PropTypes from "prop-types"
import { Avatar } from "./Avatar"
import { Comment } from "./Comment"

import { Link } from "@phosphor-icons/react"

import { useState } from "react"
import styles from "./Post.module.css"

Post.propTypes = {
  author: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  role: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object),
  publishedAt: PropTypes.objectOf(PropTypes.object),
  tags: PropTypes.arrayOf(PropTypes.string),
}

export function Post({ author, publishedAt, content, tags }) {
  const [comments, setComments] = useState(["Post arretado"])
  const [newCommentText, setNewCommentText] = useState("")

  const publishedAtDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event) {
    event.preventDefault()

    try {
      newCommentText !== "" && setComments([...comments, newCommentText])
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setNewCommentText("")
    }
  }

  function handleNewCommentChange(event) {
    try {
      setNewCommentText(event.target.value.trim())
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedAtDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "link") {
            return (
              <p key={line.content}>
                <Link className={styles.link} size={16} />
                <a href={line?.url}>{line.content}</a>
              </p>
            )
          }

          return <p key={line.content}>{line.content}</p>
        })}

        <p className={styles.tags}>
          {tags?.map((tag) => (
            <a key={tag} href="#">{`#${tag}`}</a>
          ))}
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          onChange={handleNewCommentChange}
          placeholder="Deixe um comentário"
          value={newCommentText}
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return <Comment key={index} content={comment} />
        })}
      </div>
    </article>
  )
}
