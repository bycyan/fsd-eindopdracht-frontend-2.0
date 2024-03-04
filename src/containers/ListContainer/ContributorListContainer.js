import styles from "./ListContainer.module.css"
import React, { useEffect, useState } from "react";
import { getContributors } from "../../services/userApi";
import { LinkButton } from "../../componenets/ButtonComponents/LinkButton/LinkButton";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";

const ContributorListContainer = ({ projectId }) => {
    const [contributorsOfProject, setContributorsOfProject] = useState([]);

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

    return (
        <div className={styles.content}>
            <h3>Contributors</h3>
            {contributorsOfProject.length > 0 ? (
                <div className={styles.list}>
                    {contributorsOfProject.map(contributor => (
                        <div key={contributor.id} className={styles.contributorContainer}>
                            <h5>{contributor.firstName} {contributor.lastName}</h5>
                            <LinkButton text="Go to profile" href={`user/${contributor.id}`} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>There are no contributors to display.</p>
            )}

            <div className={styles.addContainer}>
                <div className={styles.line}></div>
                <ActionButton text="Add Contributor" />
            </div>
        </div>
    );
}

export default ContributorListContainer;
