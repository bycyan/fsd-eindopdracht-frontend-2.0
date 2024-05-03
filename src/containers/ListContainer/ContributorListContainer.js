import styles from "./ListContainer.module.css"
import React, { useEffect, useState } from "react";
import { getContributors } from "../../services/api";
import { LinkButton } from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {useNavigate} from "react-router-dom";

const ContributorListContainer = ({ projectId, addContributorModal}) => {
    const [contributorsOfProject, setContributorsOfProject] = useState([]);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const contributors = await getContributors(projectId, localStorage.getItem("token"));
                setContributorsOfProject(contributors.data.contributors);
            } catch (error) {
                console.error("Error fetching contributors:", error);
            }
        };
        fetchContributors();
    }, [projectId]);


    const goToUserProfile = (userId) => {
        console.log("Navigating to user profile:", userId);
        navigate(`/user/${userId}`);
    };

    return (
        <div className={styles.content}>
            <h3>Contributors</h3>
            {contributorsOfProject.length > 0 ? (
                <div className={styles.list}>
                    {contributorsOfProject.map(contributor => (
                        <div key={contributor.id} className={styles.contributorContainer}>
                            <div>
                                <h5>{contributor.firstName} {contributor.lastName}</h5>
                                <LinkButton text="Go to profile" href={`user/${contributor.id}`} onClick={() => goToUserProfile(contributor.id)} />
                            </div>
                            <h5>{contributor.jobDescription}</h5>
                        </div>
                    ))}

                </div>
            ) : (
                <p>There are no contributors to display.</p>
            )}

            <div className={styles.addContainer} onClick={addContributorModal}>
                <div className={styles.line}></div>
                <ActionButton text="Add Contributor" />
            </div>
        </div>
    );
}

export default ContributorListContainer;
