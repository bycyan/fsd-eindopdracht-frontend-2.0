import styles from "./ListContainer.module.css"
import React, {useEffect, useRef, useState} from "react";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {getSongFile, getSongs} from "../../services/api";

const SongListContainer = ({ projectId, addSongModal}) => {
    const [songsOfProject, setSongsOfProject] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const projectSongs = songsOfProject ? songsOfProject.sort((a, b) => b.songId - a.songId) : [];
    const audioRef = useRef(null);


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
        if (songId) {
            try {
                const songFileResponse = await getSongFile(songId, localStorage.getItem("token"));
                if (songFileResponse && songFileResponse.data) {
                    const blobObject = new Blob([songFileResponse.data], { type: 'audio/mp3' });
                    const arrayBuffer = URL.createObjectURL(blobObject);
                    setCurrentSong(arrayBuffer);
                } else {
                    console.error("No audio file data found");
                }
            } catch (error) {
                console.error("Error fetching song:", error);
            }
        }
    }

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
                                <h4 className={styles.songItem}>{song.songName}</h4>

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
            {currentSong && (
                <audio ref={audioRef} id="audio-element" controls autoPlay src={currentSong} className={styles.audioElement}></audio>
            )}
        </>
    );
}

export default SongListContainer;
