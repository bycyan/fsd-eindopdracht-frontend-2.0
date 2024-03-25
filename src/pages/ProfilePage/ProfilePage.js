import React, {useState} from 'react';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import ListContainer from '../../containers/ListContainer/ListContainer';
import TextInput from "../../componenets/InputFieldComponents/TextInput/TextInput";
import PostContainer from "../../containers/FormContainer/PostContainer";
import styles from './ProfilePage.module.css';
import useUser from "../../componenets/UserComponent/UserComponent";
import PublicProfileContainer from "../../containers/ProfileContainer/PublicProfileContainer";

export default function ProfilePage(){
    const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);
    const user = useUser();


    const handleAddProjectClick = () => {
        setIsProjectWindowOpen(true);
    }

    const handleCancel = () => {
        setIsProjectWindowOpen(false);
    };

    return (
        <main>
            <section>
                <ProfileContainer {...user} />
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

