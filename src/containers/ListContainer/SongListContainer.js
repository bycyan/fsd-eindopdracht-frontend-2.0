import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React, {useEffect, useState} from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {getProfileImage, getSong, getSongs} from "../../services/userApi";
import profile_dummy from "../../assets/profile-dummy.jpg";
import PostContainer from "../FormContainer/PostContainer";

const SongListContainer = ({ projectId, addSongModal}) => {
    const [songsOfProject, setSongsOfProject] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    const projectSongs = songsOfProject ? songsOfProject.sort((a, b) => b.songId - a.songId) : [];

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songs = await getSongs(projectId, localStorage.getItem("token"));
                setSongsOfProject(songs);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, [projectId]);

    //
    const handleClick = async (songId) => {
        try {
            const songData = await getSong(songId, localStorage.getItem("token"));
            const audioData = songData.data;
            const blob = new Blob([audioData], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(blob);
            setCurrentSong(audioUrl);
            // console.log("Resource URI:", audioUrl);
        } catch (error) {
            console.error("Error fetching song:", error);
        }
    };

    return (
        <>
            <div className={styles.content}>
                <h3>Songs</h3>

                {projectSongs.length > 0 ? (
                    <div className={styles.list}>
                        {projectSongs.map(song => (
                                <div
                                    className={styles.songListContainer}
                                    key={song.songId}
                                    onClick={() => handleClick(song.songId)}
                                >
                                        <h4>{song.songName}</h4>
                                        <h4>{song.songUrl}</h4>
                                        {/*<p>2:32</p>*/}

                                    <audio controls>
                                        <source src={song.songUrl} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>

                                </div>
                        ))}
                    </div>

                 ) : (
                    <p>There are no songs to display..</p>
            )}

                <div className={styles.addContainer}>
                    <div className={styles.line}></div>
                    <div onClick={addSongModal}>
                        <ActionButton text="Add Song" />
                    </div>
                </div>

        </div>
        </>
    );

}

export default SongListContainer;
