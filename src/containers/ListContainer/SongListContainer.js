import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React, {useEffect, useState} from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {getProfileImage, getSong, getSongs} from "../../services/userApi";

const SongListContainer = ({ projectId }) => {
    // console.log(projectId)
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

    const handleClick = async (songId) => {
        try {
            const songData = await getSong(songId, localStorage.getItem("token"));
            const audioData = songData.data;

            // Create a Blob from the binary audio data
            const blob = new Blob([audioData], { type: 'audio/mp3' });

            // Create a URL for the Blob
            const audioUrl = URL.createObjectURL(blob);
            console.log("audio url: ", audioUrl)

            // Create an <audio> element and set its source to the created URL
            // const audioElement = new Audio(audioUrl);
            // Set the source of the <audio> element to the created URL
            const audioElement = document.createElement('audio');
            audioElement.src = audioUrl;
            audioElement.controls = true; // Add controls to the audio player

            // Replace the existing audio player with the new one
            setCurrentSong(audioElement);

            console.log("songData: ", songData);
        } catch (error) {
            console.error("Error fetching song:", error);
        }
    };


    console.log("current song source: ", currentSong && currentSong.src);

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
                                        <p>2:32</p>
                                </div>
                        ))}
                        {currentSong && (
                            <audio controls>
                                <source src={currentSong.src} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>

                 ) : (
                    <p>There are no songs to display..</p>
            )}

                <div className={styles.addContainer}>
                    <div className={styles.line}></div>
                    <div>
                        <ActionButton text="Add Song" />
                    </div>
                </div>

        </div>
        </>
    );

}

export default SongListContainer;
