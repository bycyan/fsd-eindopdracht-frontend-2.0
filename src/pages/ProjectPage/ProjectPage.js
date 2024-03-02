import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import styles from './ProjectPage.module.css'
import SongListContainer from "../../containers/ListContainer/SongListContainer";
import ContributorListContainer from "../../containers/ListContainer/ContributorListContainer";
import PostSongContainer from "../../containers/FormContainer/PostSongContainer";

export default function ProjectPage() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const location = useLocation();
    const currentProject = useProject();
    const handleAddSongModal = () => {
        setIsWindowOpen(true);
    }

    const handleCancel = () => {
        setIsWindowOpen(false);
    };

    if (!currentProject) {
        return <div>Loading...</div>;
    }


    const projectIdFromPath = parseInt(location.pathname.split("/").pop());
    const matchedProject = currentProject.find(project => project.projectId === projectIdFromPath);

    return (
        <div>
            {matchedProject && (
                <>
                    <ImageComponent
                        src={project_img}
                        alt="logo"
                        className="project-header"
                    />
                    <main>
                        <div className={styles.projectHeader}>
                            <ImageComponent
                                src={project_img}
                                alt="logo"
                                className="project-image-img"
                                showEdit="true"
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
                            <ContributorListContainer projectId={matchedProject.projectId} />
                        </section>
                    </main>
                    {isWindowOpen && (
                        <div className={styles.modalOverlay}>
                            <section className={styles.modalOnTop}>
                                <PostSongContainer onCancel={handleCancel} projectId={matchedProject.projectId} />
                            </section>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
