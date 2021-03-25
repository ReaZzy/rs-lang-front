import ReactAudioPlayer from "react-audio-player";
import React from "react";

export const AudioComponent = React.memo(({audio, id, audioMeaning, audioExample}) => {
    let counter = 0

    const handleEnded = (idEnded, firstAudio, secondAudio, thirdAudio) => {
        const audios = [firstAudio, secondAudio, thirdAudio]
        const audio = document.getElementById( `${idEnded}` )
        counter++
        if (counter >= audios.length) {
            audio.src = `https://api-rslang.pet-projects.ru/${audios[0]}`
            counter = 0
        } else {
            audio.src = `https://api-rslang.pet-projects.ru/${audios[counter]}`
            audio.play()
        }

    }
    return (
        <ReactAudioPlayer
            src={`https://api-rslang.pet-projects.ru/${audio}`}
            onEnded={() => {
                handleEnded( id, audio, audioMeaning, audioExample )
            }}
            id={id}
            controls
        />
    )
})