import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React, {useEffect, useState} from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {getContributors, getSong, getSongs} from "../../services/userApi";
import {LinkButton} from "../../componenets/ButtonComponents/LinkButton/LinkButton";

const ContributorListContainer = ({ projectId }) => {
    // console.log(projectId)
    const [contributorsOfProject, setContributorsOfProject] = useState([]);
    const [currentContributor, setCurrentContributor] = useState([]);
    const projectContributors = contributorsOfProject;

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const contributors = await getContributors(projectId, localStorage.getItem("token"));
                setContributorsOfProject(contributors.data.contributors);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchContributors();
    }, [projectId]);

    console.log(contributorsOfProject)

    return (
        <>
            <div className={styles.content}>
                <h3>Contributors</h3>
                {projectContributors.length > 0 ? (
                    <div className={styles.list}>
                        {projectContributors.map(contributor => (
                            <div className={styles.songListContainer}>
                                <h5>{contributor.firstName} {contributor.lastName}</h5>
                                <LinkButton text="Go to profile" href={`users/${contributor.id}`}/>
                            </div>
                        ))}
                    </div>

                ) : (
                    <p>There is no content to display..</p>
                )}

                <div className={styles.addContainer}>
                    <div className={styles.line}></div>
                    <div>
                        <ActionButton text="Add Contributor" />
                    </div>
                </div>

            </div>
        </>
    );

}

export default ContributorListContainer;
