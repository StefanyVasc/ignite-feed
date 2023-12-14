import { ThumbsUp, Trash } from "@phosphor-icons/react"
import PropTypes from "prop-types"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"

Comment.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onDeleteComment: PropTypes.func,
}

/* 
TODO:
[x] clique na lixeira e exclusao
[] clique no curtir e contador
[] tempo do comentario 
[] trazer dados da pessoa que comentou
[] html para quando tiver sem comentarios

*/

export function Comment({ content, onDeleteComment }) {
  function handleDeleteComment() {
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://avatars.githubusercontent.com/u/39599492?v=4"
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Stefany Sá</strong>
              <time
                title="4 de Dezembro às 17:32h"
                dateTime="2023-12-04 17:32:44"
              >
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
