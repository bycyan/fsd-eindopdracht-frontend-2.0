import styles from "./ListContainer.module.css"
import React, {useEffect, useState} from "react";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {getSongFile, getSongs} from "../../services/userApi";

const SongListContainer = ({ projectId, addSongModal}) => {
    const [songsOfProject, setSongsOfProject] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const projectSongs = songsOfProject ? songsOfProject.sort((a, b) => b.songId - a.songId) : [];
    const [testSong, setTestSong] = useState(null);

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

        (async () => {
            const testSongData = await getSongFile("1", localStorage.getItem("token"));
            setTestSong(testSongData);
            console.log(testSong)
        })();
    }, [projectId]);

    // const handleClick = async (songId) => {
    //     if (songId) {
    //         try {
    //             const songFileResponse = await getSongFile(songId, localStorage.getItem("token"));
    //             // const arrayBuffer = await songFileResponse.arrayBuffer();
    //             console.log("songFileResponse: ", songFileResponse);
    //             if (songFileResponse && songFileResponse.data) {
    //                 setCurrentSong(URL.createObjectURL(new Blob([songFileResponse.data], {type: 'audio/mp3'})));
    //                 console.log("Audio data:", songFileResponse.data);
    //                 const contentType = songFileResponse.headers['content-type'];
    //                 console.log("Content-Type:", contentType);
    //
    //
    //                 const blobObject = new Blob([songFileResponse.data], { type: 'audio/mp3' });
    //                 // console.log("Blob Object:", blobObject);
    //                 // console.log("Blob Data:", blobObject.data);
    //                 // console.log("Blob Data Length:", blobObject.data.length);
    //                 // console.log("Blob Data (Sample):", blobObject.data.slice(0, 100));
    //                 const arrayBuffer = await blobObject.arrayBuffer();
    //                 console.log("Blob Data (ArrayBuffer):", arrayBuffer);
    //                 const text = await blobObject.text();
    //                 console.log("Blob Data (Text):", text);
    //
    //                 // const dataArray = new Uint8Array(arrayBuffer);
    //                 // console.log("Audio data (sample):", dataArray.slice(0, 100)); // Log first 100 bytes
    //
    //             } else {
    //                 console.error("No audio file data found");
    //             }
    //             console.log("Song: ", songFileResponse, currentSong)
    //         } catch (error) {
    //             console.error("Error fetching song:", error);
    //         }
    //     }
    // }

    const handleClick = async (songId) => {
        if (songId) {
            try {
                const songFileResponse = await getSongFile(songId, localStorage.getItem("token"));
                console.log("response:", songFileResponse)
                if (songFileResponse && songFileResponse.data) {
                    const blobObject = new Blob([songFileResponse.data], { type: 'audio/mp3' });
                    const arrayBuffer = await blobObject.arrayBuffer();
                    console.log("Arraybuffer", arrayBuffer)
                    setCurrentSong(URL.createObjectURL(new Blob([arrayBuffer], { type: 'audio/mp3' })));
                } else {
                    console.error("No audio file data found");
                }
                console.log("currentSong: ", currentSong)
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
                                <h4>{song.songName}</h4>

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
            <audio id="audio-element" controls autoPlay src="http://localhost:8080/file/song/1"></audio>
            {currentSong && (
                <audio id="audio-element" controls autoPlay src={currentSong}></audio>
            )}
        </>
    );
}

export default SongListContainer;
