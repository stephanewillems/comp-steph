import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';
import { EuiLoadingSpinner } from '@elastic/eui';
import './waveSurferPlayer.css';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline'
import { useTranslation } from 'react-i18next';

type playerProps = {
    fileBlob: Blob | null,
    waveColor: string,
    // rgba required for transparency
    regionColor: string,
    height: number,
    regionDrag?: boolean,
    regionMove?: boolean,
    cropStart?: number,
    cropEnd?: number,
    setCropStart(value: number): void,
    setCropEnd(value: number): void,
    setAudioLength(value: number): void,
    setIsDecodingFile(value: boolean): void,
    timeStart?: number,
    isRegionLoop?: boolean
}

/**
 * Wave Surfer Player Component
 * @param {stepOneProps} props
 * @return {JSX.Element}
 * @author Carlos
 */
export function WaveSurferPlayer(props: playerProps): JSX.Element {
    const { t } = useTranslation();
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingFile, setIsLoadingFile] = useState(true);
    const [region, setRegion] = useState<RegionsPlugin | null>(null);
    const [activeRegion, setActiveRegion] = useState<any>(null);
    const [zoom, setZoom] = useState<string>("0");

    const playIcon = 'speech-to-text/controls/play.svg';
    const pauseIcon = 'speech-to-text/controls/pause.svg';
    const stopIcon = 'speech-to-text/controls/stop.svg';

    useEffect(() => {
        createWave();
    }, [])

    useEffect(() => {
        if (wavesurfer) {
            wavesurfer.setTime(props.timeStart ? props.timeStart : 0)
        }
    }, [wavesurfer])


    const createWave = () => {
        if (props.fileBlob) {
            const ws = WaveSurfer.create({
                container: '#waveform',
                height: props.height,
                waveColor: props.waveColor,
                plugins: [TimelinePlugin.create()]
            });
            ws.loadBlob(props.fileBlob);
            setWavesurfer(ws);
        }
    }

    // Event handler that triggers on wave surfer is ready.
    wavesurfer && wavesurfer.once('ready', () => {
        const regionWave = createRegion(wavesurfer);
        props.setCropStart(props.cropStart ? props.cropStart : 0);
        props.setCropEnd(props.cropEnd ? props.cropEnd : wavesurfer.getDuration());
        props.setAudioLength(wavesurfer.getDuration());
        setWavesurfer(regionWave);
        setIsPlaying(false);
        setIsLoadingFile(false);
        props.setIsDecodingFile(false);
    });

    // Initialize and create the RegionsPlugin
    const createRegion = (ws: WaveSurfer) => {
        if (ws) {
            const newRegion = ws.registerPlugin(RegionsPlugin.create());
            newRegion.addRegion({
                start: props.cropStart ? props.cropStart : 0,
                end: props.cropEnd ? props.cropEnd : ws.getDuration(),
                color: props.regionColor,
                id: 'unique-region-1',
                drag: props.regionDrag,
                resize: props.regionMove
            });
            setRegion(newRegion);
        }
        return ws;
    }

    // Event handler that triggers on wave surfer is played.
    wavesurfer && wavesurfer.on('play', () => {
        setIsPlaying(true);
    });

    // Event handler that triggers on wave surfer is paused.
    wavesurfer && wavesurfer.on('pause', () => {
        setIsPlaying(false);
    });

    // Pause the audio file
    const onPlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
        }
    }

    // Stop the audio file
    const onStop = () => {
        if (wavesurfer) {
            wavesurfer.stop();
        }
    }

    // Increases or decreases Zoom
    const onZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZoom(e.target.value);
        if (wavesurfer) {
            wavesurfer.zoom(parseInt(e.target.value));
        }
    }

    // Event handler for the Crop change
    region && region.on('region-updated', (region) => {
        props.setCropStart(region.start);
        props.setCropEnd(region.end);
    });

    // Event handler for the region-in
    region && region.on('region-in', (region) => {
        setActiveRegion(region);
    });

    // Event handler for the region-out
    region && region.on('region-out', (region) => {
        if (activeRegion === region) {
            if (props.isRegionLoop) {
                region.play();
            } else {
                setActiveRegion(null);
            }
        }
    });

    return (
        <>
            <div className='waveSurferPlayer'>
                {
                    isLoadingFile &&
                    <EuiLoadingSpinner className='fileProcSpinner' size="xl" />
                }
                <div id='waveform'></div>
            </div>
            {
                !isLoadingFile &&
                <div className='waveSurferControls'>
                    <div className='flex'>
                        <img src={isPlaying ? pauseIcon : playIcon} className='imgControl' onClick={onPlayPause} />
                        {
                            !props.isRegionLoop &&
                            <img src={stopIcon} className='imgControl' onClick={onStop} />
                        }
                    </div>
                    <label className='zoomInput'>
                        {t('speech.zoom')}: <input type="range" min="0" max="100" value={zoom} onChange={(e) => onZoomChange(e)} />
                    </label>
                </div>
            }
        </>
    )
}