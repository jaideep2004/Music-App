import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
	Container,
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	List,
	ListItem,
	ListItemText,
	Divider,
	Box,
	Button,
	Chip,
	CircularProgress,
	Alert,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Stack,
	Breadcrumbs,
	Link,
	Rating,
	Avatar,
	Badge,
	Tooltip,
	useTheme,
	useMediaQuery,
	Snackbar,
	Alert as MuiAlert, // Rename to avoid conflict with existing Alert
} from "@mui/material";
import {
	PlayArrow,
	Download,
	Favorite,
	Share as ShareIcon,
	AccessTime,
	Storage,
	Hearing,
	CalendarToday,
	AudioFile,
	Home as HomeIcon,
	Person,
	ShoppingCart,
	FavoriteBorder,
	Info,
	Star,
	Group,
	MusicNote,
	Album as AlbumIcon,
	Queue,
	Pause,
	SkipNext,
	SkipPrevious,
	VolumeUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { trackAPI } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import WaveformPreview from "../common/WaveformPreview";

const TrackDetailPage = () => {
	const { id } = useParams();
	const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = useAuth();
	const [track, setTrack] = useState(null);
	const [albumTracks, setAlbumTracks] = useState([]); // For album tracks
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isFavorited, setIsFavorited] = useState(false);
	const [selectedQuality, setSelectedQuality] = useState("192kHz • 24bit");
	const [shareUrl, setShareUrl] = useState(""); // Add share URL state
	const [snackbarOpen, setSnackbarOpen] = useState(false); // Add snackbar open state
	const [snackbarMessage, setSnackbarMessage] = useState(""); // Add snackbar message state
	const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Add snackbar severity state
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const isCurrentTrack = currentTrack?._id === track?._id;
	const isCurrentlyPlaying = isCurrentTrack && isPlaying;

	useEffect(() => {
		const fetchTrack = async () => {
			try {
				setLoading(true);
				setError("");
				const data = await trackAPI.getById(id);
				setTrack(data);

				// If this is an album, fetch its tracks
				if (data.type === "Album") {
					const tracksInAlbum = await trackAPI.getByAlbumId(data._id);
					setAlbumTracks(tracksInAlbum);
				}
			} catch (err) {
				setError(err.message || "Failed to fetch track details");
				console.error("Error fetching track:", err);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchTrack();
		}
	}, [id]);

	// Format duration from seconds to MM:SS
	const formatDuration = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Helper function to get cover image URL
	const getCoverImageUrl = (coverImageFilename) => {
		if (!coverImageFilename) return "/placeholder-image.svg";
		// Ensure we're using the correct path for the image
		if (coverImageFilename.startsWith("http")) {
			return coverImageFilename; // Already a full URL
		}
		// Construct the full URL for the image
		return `https://music-app-backend.cloud/uploads/${coverImageFilename}`;
	};

	// Helper function to get audio file URL
	const getAudioUrl = (audioFilename) => {
		if (!audioFilename) return "";
		// Ensure we're using the correct path for the audio
		if (audioFilename.startsWith("http")) {
			return audioFilename; // Already a full URL
		}
		// Construct the full URL for the audio
		return `https://music-app-backend.cloud/uploads/${audioFilename}`;
	};

	// Handle play/pause button click
	const handlePlayPause = () => {
		if (track) {
			if (isCurrentTrack) {
				setIsPlaying(!isPlaying);
			} else {
				setCurrentTrack(track);
				setIsPlaying(true);
			}
		}
	};

	const handleToggleFavorite = () => {
		setIsFavorited(!isFavorited);
	};

	// Handle share button click
	const handleShare = () => {
		const url = window.location.href;
		setShareUrl(url);
		
		// Copy to clipboard
		navigator.clipboard.writeText(url).then(() => {
			// Show success message
			setSnackbarMessage("Link copied to clipboard!");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
		}).catch(err => {
			console.error("Failed to copy link: ", err);
			setSnackbarMessage("Failed to copy link");
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
		});
	};

	// Handle snackbar close
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	// Generate track listing for albums
	const getTrackListing = () => {
		if (track?.type !== "Album") return [];

		// Use actual album tracks if available
		if (albumTracks.length > 0) {
			return albumTracks.map((trackItem, index) => ({
				number: index + 1,
				title: trackItem.title,
				artist: trackItem.contributors?.[0]?.name || "Unknown Artist",
				duration: trackItem.duration
					? formatDuration(trackItem.duration)
					: "0:00",
				quality: selectedQuality,
				_id: trackItem._id,
				track: trackItem, // Pass the full track object
			}));
		}

		// Fallback to mock data
		const tracks = [];
		const trackCount = Math.min(track.contributors?.length * 2 || 4, 8);
		for (let i = 1; i <= trackCount; i++) {
			tracks.push({
				number: i,
				title: `${track.title} / Track ${i}`,
				artist: track.contributors?.[0]?.name || "Unknown Artist",
				duration: formatDuration(Math.floor(Math.random() * 300) + 120), // 2-7 minutes
				quality: selectedQuality,
			});
		}
		return tracks;
	};

	// Handle playing a track from the album
	const handlePlayAlbumTrack = (trackItem) => {
		// For actual album tracks, use the track object directly
		if (trackItem.track) {
			setCurrentTrack(trackItem.track);
			setIsPlaying(true);
		} else {
			// For mock data, we can't actually play anything
			console.log("Cannot play mock track");
		}
	};

	if (loading) {
		return (
			<Container
				maxWidth='lg'
				sx={{
					py: 4,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "60vh",
				}}>
				<CircularProgress size={60} />
			</Container>
		);
	}

	if (error) {
		return (
			<Container maxWidth='lg' sx={{ py: 4 }}>
				<Alert severity='error'>{error}</Alert>
			</Container>
		);
	}

	if (!track) {
		return (
			<Container maxWidth='lg' sx={{ py: 4 }}>
				<Alert severity='info'>Track not found</Alert>
			</Container>
		);
	}

	return (
		<Box
			sx={{ backgroundColor: "background.default", minHeight: "100vh", py: { xs: 2, sm: 4 } }}>
			<Container maxWidth='xl'>
				{/* Breadcrumb Navigation */}
				<Breadcrumbs sx={{ mb: { xs: 2, sm: 3 } }} separator='›'>
					<Link
						color='text.secondary'
						href='/'
						sx={{
							display: "flex",
							alignItems: "center",
							textDecoration: "none",
							"&:hover": { color: "primary.main" },
							fontSize: { xs: '0.75rem', sm: '0.875rem' }
						}}>
						<HomeIcon sx={{ mr: 0.5, fontSize: { xs: 14, sm: 16 } }} />
						Home
					</Link>
					<Typography 
						color='text.secondary' 
						sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
					>
						Music
					</Typography>
					<Typography 
						color='text.primary' 
						sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
					>
						{track?.title}
					</Typography>
				</Breadcrumbs>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}>
					<Grid container spacing={{ xs: 2, sm: 4 }} sx={{ justifyContent: "center" }}>
						{/* Left Column - Cover Art */}
						<Grid item xs={12} md={4}>
							<Box sx={{ position: "sticky", top: { xs: 16, sm: 24 } }}>
								<Card
									sx={{
										borderRadius: { xs: 2, sm: 3 },
										overflow: "hidden",
										boxShadow: 4,
										position: "relative",
										backgroundColor: "background.paper",
										transition: "all 0.3s ease",
										"&:hover": {
											boxShadow: 6,
											transform: "translateY(-5px)",
										},
									}}>
									<CardMedia
										component='img'
										height={isMobile ? '300' : '450'}
										image={getCoverImageUrl(track.coverImage)}
										alt={track.title}
										sx={{ objectFit: "cover" }}
									/>

									{/* Overlay with action buttons */}
									<Box
										sx={{
											position: "absolute",
											top: { xs: 8, sm: 16 },
											right: { xs: 8, sm: 16 },
											display: "flex",
											gap: { xs: 0.5, sm: 1 },
										}}>
										<Tooltip title='Add to favorites'>
											{/* <IconButton
												onClick={handleToggleFavorite}
												sx={{
													backgroundColor: "rgba(255, 255, 255, 0.9)",
													color: isFavorited ? "error.main" : "text.secondary",
													"&:hover": {
														backgroundColor: "rgba(255, 255, 255, 1)",
													},
													width: { xs: 36, sm: 44 },
													height: { xs: 36, sm: 44 },
												}}>
												{isFavorited ? <Favorite /> : <FavoriteBorder />}
											</IconButton> */}
										</Tooltip>
										<Tooltip title='Share'>
											<IconButton
												onClick={handleShare}
												sx={{
													backgroundColor: "",
													color: "text.secondary",
													width: { xs: 36, sm: 44 },
													height: { xs: 36, sm: 44 },
												}}>
												<ShareIcon />
											</IconButton>
										</Tooltip>
									</Box>

									{/* Type badge */}
									<Chip
										label={track?.type?.toUpperCase()}
										size='small'
										sx={{
											position: "absolute",
											top: { xs: 8, sm: 16 },
											left: { xs: 8, sm: 16 },
											backgroundColor: "primary.main",
											color: "white",
											fontWeight: 700,
											borderRadius: 1,
											boxShadow: 2,
											fontSize: { xs: '0.65rem', sm: '0.75rem' },
											height: { xs: 20, sm: 24 },
											minWidth: { xs: 60, sm: 70 }
										}}
									/>
								</Card>

								{/* Waveform Preview - only for Singles */}
								{track.type === "Single" && (
									<Box sx={{ mt: { xs: 2, sm: 3 }, px: { xs: 0.5, sm: 1 } }}>
										<WaveformPreview
											audioUrl={getAudioUrl(track.audioFile)}
											isPlaying={isCurrentlyPlaying}
											onPlayPause={handlePlayPause}
											height={isMobile ? 80 : 100}
											showPlayButton={true}
										/>
									</Box>
								)}

								{/* Waveform Preview - for Albums too */}
								{track.type === "Album" && (
									<Box sx={{ mt: { xs: 2, sm: 3 }, px: { xs: 0.5, sm: 1 } }}>
										<WaveformPreview
											audioUrl="" // Albums don't have a single audio file
											isPlaying={isCurrentlyPlaying}
											onPlayPause={() => {
												// Play the first track in the album
												if (albumTracks.length > 0) {
													setCurrentTrack(albumTracks[0]);
													setIsPlaying(true);
												}
											}}
											height={isMobile ? 80 : 100}
											showPlayButton={true}
											isAlbum={true}
										/>
									</Box>
								)}

								{/* Action Buttons */}
								<Stack spacing={{ xs: 1, sm: 2 }} sx={{ mt: { xs: 2, sm: 3 } }}>
									{track.type === "Single" ? (
										<Button
											variant='contained'
											size={isMobile ? 'medium' : 'large'}
											fullWidth
											startIcon={isCurrentlyPlaying ? <Pause /> : <PlayArrow />}
											onClick={handlePlayPause}
											sx={{
												py: { xs: 1, sm: 1.5 },
												fontWeight: 700,
												fontSize: { xs: "1rem", sm: "1.1rem" },
												borderRadius: 2,
												boxShadow: 3,
												"&:hover": {
													boxShadow: 4,
												},
											}}>
											{isCurrentlyPlaying ? "Pause" : "Play Preview"}
										</Button>
									) : (
										<Button
											variant='contained'
											size={isMobile ? 'medium' : 'large'}
											fullWidth
											startIcon={<PlayArrow />}
											onClick={() => {
												// Play the first track in the album
												if (albumTracks.length > 0) {
													setCurrentTrack(albumTracks[0]);
													setIsPlaying(true);
												}
											}}
											sx={{
												py: { xs: 1, sm: 1.5 },
												fontWeight: 700,
												fontSize: { xs: "1rem", sm: "1.1rem" },
												borderRadius: 2,
												boxShadow: 3,
												"&:hover": {
													boxShadow: 4,
												},
											}}>
											Play Album
										</Button>
									)}

									{/* {track.type === "Single" && (
										<Button
											variant='outlined'
											size={isMobile ? 'medium' : 'large'}
											fullWidth
											startIcon={<Download />}
											sx={{
												py: { xs: 1, sm: 1.5 },
												fontWeight: 600,
												borderRadius: 2,
												borderWidth: 2,
												fontSize: { xs: "0.875rem", sm: "1rem" },
												"&:hover": {
													borderWidth: 2,
												},
											}}>
											Download Preview
										</Button>
									)} */}
								</Stack>
							</Box>
						</Grid>

						{/* Right Column - Content */}
						<Grid item xs={12} md={8}>
							<Paper
								sx={{
									p: { xs: 2, sm: 3, md: 4 },
									borderRadius: { xs: 2, sm: 3 },
									backgroundColor: "background.paper",
									boxShadow: 3,
								}}>
								{/* Header */}
								<Box sx={{ mb: { xs: 2, sm: 4 } }}>
									<Typography
										variant='h2'
										component='h1'
										sx={{
											fontWeight: 800,
											color: "primary.main",
											mb: { xs: 1, sm: 2 },
											fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
											letterSpacing: "-0.5px",
											maxWidth: "670px"
										}}>
										{track.title}
									</Typography>

									<Stack
										direction='row'
										spacing={1}
										alignItems='center'
										sx={{ mb: { xs: 2, sm: 3 }, flexWrap: "wrap" }}>
										<Typography
											variant='h6'
											sx={{
												fontWeight: 600,
												color: "text.primary",
												fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
											}}>
											by {track.contributors?.[0]?.name || "Unknown Artist"}
										</Typography>
										<Divider orientation='vertical' flexItem sx={{ height: 20 }} />
										<Rating value={4.5} precision={0.5} readOnly size={isMobile ? 'small' : 'medium'} />
										<Typography 
											variant='body2' 
											color='text.secondary'
											sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
										>
											(24 reviews)
										</Typography>
									</Stack>

									<Stack
										direction='row'
										spacing={0.5}
										sx={{ mb: { xs: 2, sm: 3 }, flexWrap: "wrap" }}>
										<Chip
											icon={<CalendarToday sx={{ fontSize: '0.9rem' }} />}
											label={`Publish Date: ${new Date(track.publishDate).toLocaleDateString('en-GB')}`}
											color='primary'
											variant='filled'
											size={isMobile ? 'small' : 'medium'}
											sx={{ fontWeight: 600 }}
										/>
										{track.type === "Single" && (
											<Chip
												label={`${track.bitrate}kHz • ${track.sampleRate}Hz`}
												variant='outlined'
												size={isMobile ? 'small' : 'medium'}
												sx={{
													fontWeight: 600,
													borderColor: "primary.main",
													color: "primary.main",
													fontSize: { xs: '0.65rem', sm: '0.75rem' }
												}}
											/>
										)}
										<Chip
											label="2025"
											variant='outlined'
											size={isMobile ? 'small' : 'medium'}
											sx={{
												fontWeight: 600,
												fontSize: { xs: '0.65rem', sm: '0.75rem' }
											}}
										/>
									</Stack>
								</Box>

								{/* Contributors Section - Displayed in the requested format */}
								<Box
									sx={{
										mb: { xs: 2, sm: 4 },
										p: { xs: 2, sm: 3 },
										backgroundColor: "grey.50",
										borderRadius: 2,
									}}>
									<Typography
										variant='h5'
										gutterBottom
										sx={{ 
											fontWeight: 700, 
											mb: 2, 
											color: "primary.main",
											fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
											maxWidth: "670px"
										}}>
										{track.type === "Album" ? "Album Credits" : "Song Credits"}: {track.title}
									</Typography>
									{track.contributors && track.contributors.length > 0 ? (
										<Box sx={{}}>
											{track.contributors.map((contributor, index) => (
												<Typography
													key={index}
													variant='body1'
													sx={{
														mb: 1,
														fontWeight: 500,
														fontSize: { xs: "0.875rem", sm: "1rem" },
														"&:before": {
															content: `"${contributor.role} : "`,
															fontWeight: 700,
															color: "primary.main",
														},
													}}>
													{contributor.name}
												</Typography>
											))}
											{/* <Typography
												variant='body1'
												sx={{
													mt: 1,
													fontWeight: 500,
													fontSize: { xs: "0.875rem", sm: "1rem" },
													"&:before": {
														content: `"${track.type === "Album" ? "Label" : "Label"} : "`,
														fontWeight: 700,
														color: "primary.main",
													},
												}}>
												{track.type === "Album" ? "Album Release" : "Single Audio Official"}
											</Typography> */}
											{/* Add Release Date to Song Credits */}
											<Typography
												variant='body1'
												sx={{
													mt: 1,
													fontWeight: 500,
													fontSize: { xs: "0.875rem", sm: "1rem" },
													"&:before": {
														content: `"Release Date : "`,
														fontWeight: 700,
														color: "primary.main",
													},
												}}>
												{new Date(track.publishDate).toLocaleDateString('en-GB')}
											</Typography>
											{track.releaseDate && (
												<Typography
													variant='body1'
													sx={{
														mt: 1,
														fontWeight: 500,
														fontSize: { xs: "0.875rem", sm: "1rem" },
														"&:before": {
															content: `"Original Release Date : "`,
															fontWeight: 700,
															color: "primary.main",
														},
													}}>
													{new Date(track.releaseDate).toLocaleDateString('en-GB')}
												</Typography>
											)}
											{/* Add Genre to Song Credits */}
											<Typography
												variant='body1'
												sx={{
													mt: 1,
													fontWeight: 500,
													fontSize: { xs: "0.875rem", sm: "1rem" },
													"&:before": {
														content: `"Genre : "`,
														fontWeight: 700,
														color: "primary.main",
													},
												}}>
												{track.genre}
											</Typography>
										</Box>
									) : (
										<Typography 
											variant='body2' 
											color='text.secondary'
											sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
										>
											No contributors information available
										</Typography>
									)}
								</Box>

								{/* Track Listing Table */}
								<Typography
									variant='h5'
									gutterBottom
									sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
									{track.type === "Album"
										? `${albumTracks.length || getTrackListing().length} Tracks`
										: "Track Details"}
								</Typography>

								<TableContainer
									component={Paper}
									sx={{
										mb: 4,
										border: "1px solid",
										borderColor: "divider",
										borderRadius: 2,
									}}>
									<Table>
										<TableHead>
											<TableRow sx={{ backgroundColor: "grey.100" }}>
												<TableCell
													sx={{
														fontWeight: 700,
														fontSize: "0.875rem",
														color: "text.primary",
													}}>
													#
												</TableCell>
												<TableCell
													sx={{
														fontWeight: 700,
														fontSize: "0.875rem",
														color: "text.primary",
													}}>
													TITLE
												</TableCell>
												<TableCell
													sx={{
														fontWeight: 700,
														fontSize: "0.875rem",
														color: "text.primary",
													}}>
													ARTIST
												</TableCell>
												{track.type === "Single" && (
													<TableCell
														sx={{
															fontWeight: 700,
															fontSize: "0.875rem",
															color: "text.primary",
														}}>
														QUALITY
													</TableCell>
												)}
												<TableCell
													align='right'
													sx={{
														fontWeight: 700,
														fontSize: "0.875rem",
														color: "text.primary",
													}}>
													TIME
												</TableCell>
												<TableCell
													align='center'
													sx={{
														fontWeight: 700,
														fontSize: "0.875rem",
														color: "text.primary",
													}}>
													ACTION
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{track.type === "Album" ? (
												getTrackListing().map((trackItem) => (
													<TableRow
														key={trackItem.number}
														sx={{
															"&:hover": { backgroundColor: "grey.50" },
															borderBottom: "1px solid",
															borderColor: "divider",
															cursor: "pointer",
														}}>
														<TableCell>
															<Typography
																variant='body2'
																color='text.secondary'>
																{trackItem.number}
															</Typography>
														</TableCell>
														<TableCell>
															<Typography
																variant='body2'
																sx={{ fontWeight: 600 }}>
																{trackItem.title}
															</Typography>
														</TableCell>
														<TableCell>
															<Typography
																variant='body2'
																color='text.secondary'>
																{trackItem.artist}
															</Typography>
														</TableCell>
														<TableCell align='right'>
															<Typography variant='body2'>
																{trackItem.duration}
															</Typography>
														</TableCell>
														<TableCell align='center'>
															<IconButton
																size='small'
																color='primary'
																onClick={() => handlePlayAlbumTrack(trackItem)}
																sx={{
																	"&:hover": {
																		backgroundColor: "primary.light",
																		color: "white",
																	},
																}}>
																<PlayArrow />
															</IconButton>
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell>
														<Typography variant='body2' color='text.secondary'>
															1
														</Typography>
													</TableCell>
													<TableCell>
														<Typography
															variant='body2'
															sx={{ fontWeight: 600 }}>
															{track.title}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography variant='body2' color='text.secondary'>
															{track.contributors?.[0]?.name ||
																"Unknown Artist"}
														</Typography>
													</TableCell>
													<TableCell>
														<Typography variant='body2' color='text.secondary'>
															{selectedQuality}
														</Typography>
													</TableCell>
													<TableCell align='right'>
														<Typography variant='body2'>
															{formatDuration(track.duration)}
														</Typography>
													</TableCell>
													<TableCell align='center'>
														<IconButton
															size='small'
															color='primary'
															onClick={handlePlayPause}
															sx={{
																"&:hover": {
																	backgroundColor: "primary.light",
																	color: "white",
																},
															}}>
															{isCurrentlyPlaying ? <Pause /> : <PlayArrow />}
														</IconButton>
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>

								{/* Info sections */}
								<Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
									{/* Technical Information */}
									<Grid item xs={12} md={6} sx={{ display: 'flex', padding: 0, width: '100%' }}>
										<Paper sx={{ p: 3, height: "100%", borderRadius: 2, width: '100%' }}>
											<Typography
												variant='h6'
												gutterBottom
												sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
												<Info sx={{ mr: 1, verticalAlign: "middle" }} />
												{track.type === "Album" ? "Album Information" : "Technical Information"}
											</Typography>
											<Stack spacing={2}>
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}>
													<Typography variant='body2' color='text.secondary'>
														{track.type === "Album" ? "Total Tracks" : "File Type"}:
													</Typography>
													<Typography variant='body2' sx={{ fontWeight: 600 }}>
														{track.type === "Album" 
															? (albumTracks.length || 0) 
															: (track.fileType?.toUpperCase() || "MP3")}
													</Typography>
												</Box>
												{track.type === "Single" && (
													<>
														<Box
															sx={{
																display: "flex",
																justifyContent: "space-between",
															}}>
															<Typography
																variant='body2'
																color='text.secondary'>
																Bitrate:
															</Typography>
															<Typography
																variant='body2'
																sx={{ fontWeight: 600 }}>
																{track.bitrate || 192} kbps
															</Typography>
														</Box>
														<Box
															sx={{
																display: "flex",
																justifyContent: "space-between",
															}}>
															<Typography
																variant='body2'
																color='text.secondary'>
																Sample Rate:
															</Typography>
															<Typography
																variant='body2'
																sx={{ fontWeight: 600 }}>
																{track.sampleRate || 44100} Hz
															</Typography>
														</Box>
														<Box
															sx={{
																display: "flex",
																justifyContent: "space-between",
															}}>
															<Typography
																variant='body2'
																color='text.secondary'>
																Duration:
															</Typography>
															<Typography
																variant='body2'
																sx={{ fontWeight: 600 }}>
																{formatDuration(track.duration)}
															</Typography>
														</Box>
													</>
												)}
												{track.type === "Album" && albumTracks.length > 0 && (
													<Box
														sx={{
															display: "flex",
															justifyContent: "space-between",
														}}>
														<Typography variant='body2' color='text.secondary'>
															Total Duration:
														</Typography>
														<Typography variant='body2' sx={{ fontWeight: 600 }}>
															{formatDuration(albumTracks.reduce((total, track) => total + (track.duration || 0), 0))}
														</Typography>
													</Box>
												)}
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}>
													<Typography variant='body2' color='text.secondary'>
														Plays:
													</Typography>
													<Typography variant='body2' sx={{ fontWeight: 600 }}>
														{track.listenCount >= 1000000 
															? `${(track.listenCount / 1000000).toFixed(1)}M` 
															: track.listenCount >= 1000 
																? `${(track.listenCount / 1000).toFixed(1)}K` 
																: track.listenCount}
													</Typography>
												</Box>
											</Stack>
										</Paper>
									</Grid>

									{/* Release Information */}
									<Grid item xs={12} md={6} sx={{ display: 'flex', padding: 0, width: '100%' }}>
										<Paper sx={{ p: 3, height: "100%", borderRadius: 2, width: '100%' }}>
											<Typography
												variant='h6'
												gutterBottom
												sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
												<CalendarToday
													sx={{ mr: 1, verticalAlign: "middle" }}
												/>
												Release Information
											</Typography>
											<Stack spacing={2}>
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}>
													<Typography variant='body2' color='text.secondary'>
														Publish Date:
													</Typography>
													<Typography variant='body2' sx={{ fontWeight: 600 }}>
														{new Date(track.publishDate).toLocaleDateString('en-GB')}
													</Typography>
												</Box>
												{track.releaseDate && (
													<Box
														sx={{
															display: "flex",
															justifyContent: "space-between",
														}}>
														<Typography variant='body2' color='text.secondary'>
															Release Date:
														</Typography>
														<Typography variant='body2' sx={{ fontWeight: 600 }}>
															{new Date(track.releaseDate).toLocaleDateString('en-GB')}
														</Typography>
													</Box>
												)}
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}>
													<Typography variant='body2' color='text.secondary'>
														Type:
													</Typography>
													<Chip
														label={track.type}
														size='small'
														variant='filled'
														sx={{
															fontWeight: 600,
															backgroundColor:
																track.type === "Album"
																	? "secondary.main"
																	: "primary.main",
															color: "white",
														}}
													/>
												</Box>
												{/* Genre is now displayed in the credits section */}
											</Stack>
										</Paper>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</motion.div>
			</Container>
			
			{/* Snackbar for share notifications */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
				<MuiAlert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					variant="filled"
					sx={{ width: '100%' }}>
					{snackbarMessage}
				</MuiAlert>
			</Snackbar>
		</Box>
	);
};

export default TrackDetailPage;
