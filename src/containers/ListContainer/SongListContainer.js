import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React, {useEffect, useState} from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";
import axios from "axios";
import {getProfileImage, getSong, getSongFile, getSongs} from "../../services/userApi";
import profile_dummy from "../../assets/profile-dummy.jpg";
import PostContainer from "../FormContainer/PostContainer";

const SongListContainer = ({ projectId, addSongModal}) => {
    const [songsOfProject, setSongsOfProject] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const projectSongs = songsOfProject ? songsOfProject.sort((a, b) => b.songId - a.songId) : [];

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songs = await getSongs(projectId, localStorage.getItem("token"));
                setSongsOfProject(songs);
                console.log("songs:",songs)
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, [projectId]);

    // const handleClick = async (songId) => {
    //     try {
    //         const songData = await getSong(songId, localStorage.getItem("token"));
    //         console.log("Song Data:", songData);
    //
    //         // const songUrl = songsOfProject[0].songUrl;
    //         // console.log(songUrl);
    //         //
    //         // let audioUrls = []; // Array to store audio URLs
    //         //
    //         // songsOfProject.forEach(song => {
    //         //     console.log(song.songUrl);
    //         //
    //         //     fetch(song.songUrl)
    //         //         .then(response => response.arrayBuffer())
    //         //         .then(buffer => {
    //         //             // 'buffer' contains the binary data of the audio file
    //         //             const blob = new Blob([buffer], { type: 'audio/mpeg' });
    //         //             const audioUrl = URL.createObjectURL(blob);
    //         //             // Store the audio URL in the array
    //         //             audioUrls.push(audioUrl);
    //         //             // You can also store the blob if needed
    //         //             // blobs.push(blob);
    //         //             console.log(blob);
    //         //         })
    //         //         .catch(error => {
    //         //             console.error('Error fetching audio file:', error);
    //         //         });
    //         // });
    //         //
    //         // // Now you can work with the audio URLs or blobs outside the forEach loop
    //         // console.log(audioUrls);
    //
    //         if (songData){
    //             const songFile = await getSongFile(songId, localStorage.getItem("token"));
    //             console.log("Fetched File:", songFile);
    //
    //             // const blob = new Blob([songFile.data], { type: 'audio/mpeg' });
    //
    //             // console.log("Blob:", blob);
    //
    //             // const audioUrl = URL.createObjectURL(blob);
    //
    //             // console.log("Audio url:", audioUrl);
    //
    //             setCurrentSong(songFile.data);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching song:", error);
    //     }
    // };

    // Inside handleClick function
// Inside handleClick function
    const handleClick = async (songId) => {
        try {
            const songData = await getSong(songId, localStorage.getItem("token"));
            console.log("Song Data:", songData);

            if (songData) {
                const songFile = await getSongFile(songId, localStorage.getItem("token"));
                console.log("Fetched File:", songFile);

                if (songFile && songFile.data) {
                    setCurrentSong(URL.createObjectURL(new Blob([songFile.data], { type: 'audio/mp3' })));
                } else {
                    console.error("No audio file data found");
                }
            }
        } catch (error) {
            console.error("Error fetching song:", error);
        }
    };

    console.log("end song: ", currentSong)

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

                            </div>
                        ))}
                        {currentSong && (
                            <audio id="audio-element" controls autoPlay src={currentSong}>
                                Your browser does not support the audio element.
                            </audio>
                        )}
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

            {/* Render audio element if currentSong exists */}

        </>
    );
}

export default SongListContainer;
