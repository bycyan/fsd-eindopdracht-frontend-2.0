import React, {useState} from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import ListContainer from '../../containers/ListContainer/ListContainer';
import TextInput from "../../componenets/InputFieldComponents/TextInput/TextInput";
import PostContainer from "../../containers/FormContainer/PostContainer";
import styles from './ProfilePage.module.css';

export default function ProfilePage(){
    const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);

    const handleAddProjectClick = () => {
        setIsProjectWindowOpen(true);
    }

    const handleCancel = () => {
        setIsProjectWindowOpen(false); // Set the state to false to close the project window
    };

    return (
        <main>
            <section>
                <ProfileContainer />
            </section>
            <section>
                <ListContainer onAddProjectClick={handleAddProjectClick} />
            </section>
            {isProjectWindowOpen && (
                <div className={styles.modalOverlay}>
                    <section className={styles.modalOnTop}>
                        <PostContainer onCancel={handleCancel}/>
                    </section>
                </div>
            )}
        </main>
);
}

