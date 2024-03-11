import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
// import project_img from "../../assets/project-img.jpeg";
import styles from './ProjectPage.module.css'
import SongListContainer from "../../containers/ListContainer/SongListContainer";
import ContributorListContainer from "../../containers/ListContainer/ContributorListContainer";
import PostSongContainer from "../../containers/FormContainer/PostSongContainer";
import PostContributorContainer from "../../containers/FormContainer/PostContributorContainer";
import {getProfileImage, getProjectImage} from "../../services/userApi";
// import profile_dummy from "../../assets/profile-dummy.jpg"; // Import the contributor form container

export default function ProjectPage() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [isContributorWindowOpen, setIsContributorWindowOpen] = useState(false);
    const [projectImageUrl, setProjectImageUrl] = useState(false);
    const location = useLocation();
    const currentProject = useProject();
    const projectIdFromPath = parseInt(location.pathname.split("/").pop());
    const matchedProject = currentProject ? currentProject.find(project => project.projectId === projectIdFromPath) : null;

    useEffect(() => {
        const fetchProjectImage = async () => {
            if (matchedProject) {
                const imageData = await getProjectImage(matchedProject.projectId, localStorage.getItem('token'));
                console.log(imageData)
                if (imageData) {
                    const blob = new Blob([imageData], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    setProjectImageUrl(url);
                }
            }
        };

        fetchProjectImage();
    }, [matchedProject]);

    const handleAddSongModal = () => {
        setIsWindowOpen(true);
    }

    const handleAddContributorModal = () => {
        setIsContributorWindowOpen(true); // Function to open contributor window
    }

    const handleCancel = () => {
        setIsWindowOpen(false);
        setIsContributorWindowOpen(false); // Function to close both windows
    };

    if (!currentProject) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {matchedProject && (
                <>
                    <ImageComponent
                        src={projectImageUrl}
                        alt="logo"
                        className="project-header"
                    />
                    <main>
                        <div className={styles.projectHeader}>
                            <ImageComponent
                                src={projectImageUrl}
                                alt="logo"
                                className="project-image-img"
                            />
                            <div className={styles.headerInfo}>
                                <div>
                                    <h3>{matchedProject.projectName}</h3>
                                    <p>{matchedProject.projectArtist}</p>
                                </div>
                                <p>{matchedProject.projectRelease}</p>
                            </div>
                        </div>

                        <section>
                            <SongListContainer projectId={matchedProject.projectId} addSongModal={handleAddSongModal} />
                        </section>

                        <section>
                            <ContributorListContainer projectId={matchedProject.projectId} addContributorModal={handleAddContributorModal} />
                        </section>
                    </main>
                    {isWindowOpen && (
                        <div className={styles.modalOverlay}>
                            <section className={styles.modalOnTop}>
                                <PostSongContainer onCancel={handleCancel} projectId={matchedProject.projectId} />
                            </section>
                        </div>
                    )}
                    {isContributorWindowOpen && (
                        <div className={styles.modalOverlay}>
                            <section className={styles.modalOnTop}>
                                <PostContributorContainer onCancel={handleCancel} project={matchedProject} />
                            </section>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
