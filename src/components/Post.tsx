import { format } from 'date-fns';

import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { formatDate } from '../util/formatDate';
import { relativeDate } from '../util/relativeDate';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import enIE from 'date-fns/esm/locale/en-IE/index.js';

const comments = [
    1,
    2,
    3,
];

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export function Post({ author, publishedAt, content}: PostProps) {

    const [comments, setComments] = useState([
        'Post muito bacana, hein?'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = formatDate(publishedAt)
    const publishedDateRelativeToNow = relativeDate(publishedAt)

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()


        setComments([...comments, newCommentText]);
        setNewCommentText('');

    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete;
        })

        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmptty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                         <strong>{author.name}</strong>
                         <span>{author.role}</span>
                    </div>

                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                 {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}

            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    placeholder='Deixe um comentário' 
                    onChange={handleNewCommentChange} 
                    value= {newCommentText}
                    onInvalid={handleNewCommentInvalid}
                    required>
                </textarea>

                <footer>
                  <button type='submit' disabled={isNewCommentEmptty}>
                     Publicar
                  </button>
                </footer>
            </form>

                <div className={styles.commentList}>
                    {comments.map(comment =>{
                        return (
                            <Comment 
                                key={comment} 
                                content={comment} 
                                onDeleteComment={deleteComment}
                                />)
                    })}
                 </div>
        </article>
    );
}