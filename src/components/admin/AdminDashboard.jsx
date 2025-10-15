import { useState, useEffect } from "react";
import {
	Container,
	Typography,
	Box,
	Button,
	Paper,
	Tabs,
	Tab,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip,
	IconButton,
	Alert,
	CircularProgress,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	Divider,
	Stack,
} from "@mui/material";
import { useSnackbar } from 'notistack';
import { Add, Delete, Edit, UploadFile, Image, Album as AlbumIcon, AccessTime, PlayArrow, Pause } from "@mui/icons-material";
import { motion } from "framer-motion";
import { trackAPI } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { Person } from "@mui/icons-material";

// Add this at the top of the component
const AdminDashboard = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [activeTab, setActiveTab] = useState(0);
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Form state for new track/single
	const [newTrack, setNewTrack] = useState({
		title: "",
		type: "Single",
		genre: "",
		contributors: [{ name: "", role: "Artist" }],
		listenCount: 0,
		publishDate: new Date().toISOString().split('T')[0], // Add publish date field
	});

	// Form state for new album
	const [newAlbum, setNewAlbum] = useState({
		title: "",
		genre: "",
		contributors: [{ name: "", role: "Artist" }],
		tracks: [
			{
				title: "",
				trackNumber: 1,
				contributors: [{ name: "", role: "Artist" }],
			},
		],
		listenCount: 0,
		publishDate: new Date().toISOString().split('T')[0], // Add publish date field
	});

	// Form state for editing track
	const [editTrack, setEditTrack] = useState({
		title: "",
		type: "Single",
		genre: "",
		contributors: [{ name: "", role: "Artist" }],
		listenCount: 0,
		publishDate: new Date().toISOString().split('T')[0], // Add publish date field
	});

	// File upload state
	const [coverImage, setCoverImage] = useState(null);
	const [audioFile, setAudioFile] = useState(null);
	const [albumCoverImage, setAlbumCoverImage] = useState(null);
	const [albumTracks, setAlbumTracks] = useState([]); // For album tracks during editing

	// Preview state
	const [coverImagePreview, setCoverImagePreview] = useState(null);
	const [audioFilePreview, setAudioFilePreview] = useState(null);
	const [albumCoverImagePreview, setAlbumCoverImagePreview] = useState(null);
	const [albumTrackPreviews, setAlbumTrackPreviews] = useState([]);

	// Edit track state
	const [editingTrack, setEditingTrack] = useState(null);
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	const { user } = useAuth();
	const token = user?.token;

	// Helper function to get cover image URL
	const getCoverImageUrl = (coverImagePath) => {
		if (!coverImagePath) return "";
		// Extract the filename from the full path
		// The path might be something like "uploads\coverImage-123456789.jpg"
		const filename = coverImagePath.split("\\").pop().split("/").pop();
		return `https://music-app-backend.cloud/uploads/${filename}`;
	};

	// Helper function to format duration
	const formatDuration = (seconds) => {
		if (!seconds) return "0:00";
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	// Fetch tracks from backend
	const fetchTracks = async () => {
		setLoading(true);
		setError("");
		try {
			// Fetch more tracks to ensure we see all of them
			const data = await trackAPI.getAll(1, 1000); // Fetch first 1000 tracks
			setTracks(data.tracks || []);
		} catch (err) {
			setError(err.message || "Failed to fetch tracks");
			enqueueSnackbar(err.message || "Failed to fetch tracks", { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (token) {
			fetchTracks();
		}
	}, [token, activeTab]);

	// Update editTrack state when editingTrack changes
	useEffect(() => {
		if (editingTrack) {
			setEditTrack({
				title: editingTrack.title,
				type: editingTrack.type,
				genre: editingTrack.genre,
				contributors: editingTrack.contributors || [
					{ name: "", role: "Artist" },
				],
				listenCount: editingTrack.listenCount || 0,
				publishDate: editingTrack.publishDate ? new Date(editingTrack.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Add publish date
			});
		}
	}, [editingTrack]);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const handleInputChange = (
		e,
		isEdit = false,
		isAlbum = false,
		isAlbumTrack = false,
		trackIndex = null
	) => {
		const { name, value } = e.target;

		if (isAlbum) {
			if (isAlbumTrack && trackIndex !== null) {
				// Handle album track input change
				const updatedTracks = [...newAlbum.tracks];
				updatedTracks[trackIndex] = {
					...updatedTracks[trackIndex],
					[name]: value,
				};
				setNewAlbum({
					...newAlbum,
					tracks: updatedTracks,
				});
			} else {
				// Handle album input change
				setNewAlbum({
					...newAlbum,
					[name]: value,
				});
			}
		} else if (isEdit) {
			setEditTrack({
				...editTrack,
				[name]: value,
			});
		} else {
			setNewTrack({
				...newTrack,
				[name]: value,
			});
		}
	};

	const handleContributorChange = (
		index,
		field,
		value,
		isEdit = false,
		isAlbum = false,
		isAlbumTrack = false,
		trackIndex = null
	) => {
		if (isAlbum) {
			if (isAlbumTrack && trackIndex !== null) {
				// Handle album track contributor change
				const updatedTracks = [...newAlbum.tracks];
				const contributors = [...updatedTracks[trackIndex].contributors];
				contributors[index] = {
					...contributors[index],
					[field]: value,
				};
				updatedTracks[trackIndex] = {
					...updatedTracks[trackIndex],
					contributors,
				};
				setNewAlbum({
					...newAlbum,
					tracks: updatedTracks,
				});
			} else {
				// Handle album contributor change
				const contributors = [...newAlbum.contributors];
				contributors[index] = {
					...contributors[index],
					[field]: value,
				};
				setNewAlbum({
					...newAlbum,
					contributors,
				});
			}
		} else {
			const contributors = isEdit
				? editTrack.contributors
				: newTrack.contributors;
			const setContributors = isEdit
				? (updated) => setEditTrack({ ...editTrack, contributors: updated })
				: (updated) => setNewTrack({ ...newTrack, contributors: updated });

			const updatedContributors = [...contributors];
			updatedContributors[index][field] = value;
			setContributors(updatedContributors);
		}
	};

	const addContributor = (
		isEdit = false,
		isAlbum = false,
		isAlbumTrack = false,
		trackIndex = null
	) => {
		if (isAlbum) {
			if (isAlbumTrack && trackIndex !== null) {
				// Add contributor to album track
				const updatedTracks = [...newAlbum.tracks];
				updatedTracks[trackIndex] = {
					...updatedTracks[trackIndex],
					contributors: [
						...updatedTracks[trackIndex].contributors,
						{ name: "", role: "Artist" },
					],
				};
				setNewAlbum({
					...newAlbum,
					tracks: updatedTracks,
				});
			} else {
				// Add contributor to album
				setNewAlbum({
					...newAlbum,
					contributors: [
						...newAlbum.contributors,
						{ name: "", role: "Artist" },
					],
				});
			}
		} else {
			const contributors = isEdit
				? editTrack.contributors
				: newTrack.contributors;
			const setContributors = isEdit
				? (updated) => setEditTrack({ ...editTrack, contributors: updated })
				: (updated) => setNewTrack({ ...newTrack, contributors: updated });

			setContributors([...contributors, { name: "", role: "Artist" }]);
		}
	};

	const removeContributor = (
		index,
		isEdit = false,
		isAlbum = false,
		isAlbumTrack = false,
		trackIndex = null
	) => {
		if (isAlbum) {
			if (isAlbumTrack && trackIndex !== null) {
				// Remove contributor from album track
				const updatedTracks = [...newAlbum.tracks];
				const contributors = [...updatedTracks[trackIndex].contributors];
				contributors.splice(index, 1);
				updatedTracks[trackIndex] = {
					...updatedTracks[trackIndex],
					contributors,
				};
				setNewAlbum({
					...newAlbum,
					tracks: updatedTracks,
				});
			} else {
				// Remove contributor from album
				const contributors = [...newAlbum.contributors];
				contributors.splice(index, 1);
				setNewAlbum({
					...newAlbum,
					contributors,
				});
			}
		} else {
			const contributors = isEdit
				? editTrack.contributors
				: newTrack.contributors;
			const setContributors = isEdit
				? (updated) => setEditTrack({ ...editTrack, contributors: updated })
				: (updated) => setNewTrack({ ...newTrack, contributors: updated });

			const updatedContributors = [...contributors];
			updatedContributors.splice(index, 1);
			setContributors(updatedContributors);
		}
	};

	const addAlbumTrack = () => {
		setNewAlbum({
			...newAlbum,
			tracks: [
				...newAlbum.tracks,
				{
					title: "",
					trackNumber: newAlbum.tracks.length + 1,
					contributors: [{ name: "", role: "Artist" }],
				},
			],
		});
	};

	const removeAlbumTrack = (index) => {
		const updatedTracks = [...newAlbum.tracks];
		updatedTracks.splice(index, 1);
		// Update track numbers
		const reorderedTracks = updatedTracks.map((track, i) => ({
			...track,
			trackNumber: i + 1,
		}));
		setNewAlbum({
			...newAlbum,
			tracks: reorderedTracks,
		});
	};

	// New function to apply album title to all tracks
	const applyAlbumTitleToAllTracks = () => {
		const updatedTracks = newAlbum.tracks.map((track, index) => ({
			...track,
			title: `${newAlbum.title} - Track ${index + 1}`,
		}));

		setNewAlbum({
			...newAlbum,
			tracks: updatedTracks,
		});
	};

	// New function to apply album genre to all tracks
	const applyGenreToAllTracks = () => {
		const updatedTracks = newAlbum.tracks.map((track) => ({
			...track,
			genre: newAlbum.genre,
		}));

		setNewAlbum({
			...newAlbum,
			tracks: updatedTracks,
		});
	};

	// New function to apply album contributors to all tracks
	const applyContributorsToAllTracks = () => {
		const updatedTracks = newAlbum.tracks.map((track) => ({
			...track,
			contributors: [...newAlbum.contributors],
		}));

		setNewAlbum({
			...newAlbum,
			tracks: updatedTracks,
		});
	};

	const handleFileChange = (e, fileType, isAlbum = false) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			if (isAlbum) {
				if (fileType === "cover") {
					const file = files[0];
					setAlbumCoverImage(file);
					// Create preview for album cover
					const reader = new FileReader();
					reader.onloadend = () => {
						setAlbumCoverImagePreview(reader.result);
					};
					reader.readAsDataURL(file);
				} else if (fileType === "tracks") {
					// Handle multiple track files
					const fileArray = Array.from(files);
					setAlbumTracks(fileArray);
					// Create previews for album tracks
					const previews = [];
					fileArray.forEach((file, index) => {
						previews[index] = {
							name: file.name,
							size: file.size,
							type: file.type,
							lastModified: file.lastModified,
						};
					});
					setAlbumTrackPreviews(previews);
					
					// Automatically populate track titles based on file names
					const updatedTracks = [...newAlbum.tracks];
					fileArray.forEach((file, index) => {
						if (updatedTracks[index]) {
							// Extract title from filename (remove extension)
							const title = file.name.replace(/\.[^/.]+$/, "");
							updatedTracks[index] = {
								...updatedTracks[index],
								title: title
							};
						} else {
							// If track doesn't exist, create a new one
							const title = file.name.replace(/\.[^/.]+$/, "");
							updatedTracks[index] = {
								title: title,
								trackNumber: index + 1,
								contributors: [{ name: "", role: "Artist" }],
							};
						}
					});
					// If we have more tracks in state than files, trim the excess
					const trimmedTracks = updatedTracks.slice(0, fileArray.length);
					// If we have fewer tracks in state than files, add the missing ones
					for (let i = updatedTracks.length; i < fileArray.length; i++) {
						const title = fileArray[i].name.replace(/\.[^/.]+$/, "");
						trimmedTracks.push({
							title: title,
							trackNumber: i + 1,
							contributors: [{ name: "", role: "Artist" }],
						});
					}
					setNewAlbum({
						...newAlbum,
						tracks: trimmedTracks
					});
				}
			} else {
				if (fileType === "cover") {
					const file = files[0];
					setCoverImage(file);
					// Create preview for cover image
					const reader = new FileReader();
					reader.onloadend = () => {
						setCoverImagePreview(reader.result);
					};
					reader.readAsDataURL(file);
				} else if (fileType === "audio") {
					const file = files[0];
					setAudioFile(file);
					// Create preview info for audio file
					setAudioFilePreview({
						name: file.name,
						size: file.size,
						type: file.type,
						lastModified: file.lastModified,
					});
					
					// Automatically populate track title based on file name
					const title = file.name.replace(/\.[^/.]+$/, "");
					setNewTrack({
						...newTrack,
						title: title
					});
				}
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!newTrack.title || !newTrack.genre) {
			setError("Title and genre are required");
			enqueueSnackbar("Title and genre are required", { variant: "error" });
			return;
		}

		if (!coverImage) {
			setError("Cover image is required");
			enqueueSnackbar("Cover image is required", { variant: "error" });
			return;
		}

		if (!audioFile) {
			setError("Audio file is required");
			enqueueSnackbar("Audio file is required", { variant: "error" });
			return;
		}

		// Additional validation for file types
		if (coverImage && !coverImage.type.startsWith('image/')) {
			setError("Cover image must be an image file (JPEG, PNG, etc.)");
			enqueueSnackbar("Cover image must be an image file (JPEG, PNG, etc.)", { variant: "error" });
			return;
		}

		if (audioFile && !audioFile.type.startsWith('audio/')) {
			setError("Audio file must be an audio file (MP3, FLAC, WAV, etc.)");
			enqueueSnackbar("Audio file must be an audio file (MP3, FLAC, WAV, etc.)", { variant: "error" });
			return;
		}

		setLoading(true);
		setError("");
		setSuccess("");

		try {
			// Create FormData for file upload
			const formData = new FormData();
			formData.append("title", newTrack.title);
			formData.append("type", newTrack.type);
			formData.append("genre", newTrack.genre);
			formData.append("contributors", JSON.stringify(newTrack.contributors));
			formData.append("coverImage", coverImage);
			formData.append("audioFile", audioFile);

			// Add other optional fields
			formData.append("listenCount", newTrack.listenCount.toString());
			formData.append("publishDate", newTrack.publishDate); // Use custom publish date

			await trackAPI.create(formData, token);

			setSuccess("Track uploaded successfully!");
			enqueueSnackbar("Track uploaded successfully!", { variant: "success" });

			// Reset form
			setNewTrack({
				title: "",
				type: "Single",
				genre: "",
				contributors: [{ name: "", role: "Artist" }],
				publishDate: new Date().toISOString().split('T')[0], // Reset to today's date
			});
			setCoverImage(null);
			setAudioFile(null);
			setCoverImagePreview(null);
			setAudioFilePreview(null);

			// Refresh tracks list
			fetchTracks();
		} catch (err) {
			const errorMessage = err.message || "Failed to upload track";
			setError(errorMessage);
			enqueueSnackbar(errorMessage, { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	const handleAlbumSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!newAlbum.title || !newAlbum.genre) {
			setError("Album title and genre are required");
			enqueueSnackbar("Album title and genre are required", { variant: "error" });
			return;
		}

		if (!albumCoverImage) {
			setError("Album cover image is required");
			enqueueSnackbar("Album cover image is required", { variant: "error" });
			return;
		}

		// Validate cover image type
		if (albumCoverImage && !albumCoverImage.type.startsWith('image/')) {
			setError("Album cover image must be an image file (JPEG, PNG, etc.)");
			enqueueSnackbar("Album cover image must be an image file (JPEG, PNG, etc.)", { variant: "error" });
			return;
		}

		if (newAlbum.tracks.length === 0) {
			setError("At least one track is required");
			enqueueSnackbar("At least one track is required", { variant: "error" });
			return;
		}

		if (albumTracks.length !== newAlbum.tracks.length) {
			setError("Please upload audio files for all tracks");
			enqueueSnackbar("Please upload audio files for all tracks", { variant: "error" });
			return;
		}

		// Validate track files
		for (let i = 0; i < albumTracks.length; i++) {
			if (!albumTracks[i].type.startsWith('audio/')) {
				setError(`Track file ${i + 1} must be an audio file (MP3, FLAC, WAV, etc.)`);
				enqueueSnackbar(`Track file ${i + 1} must be an audio file (MP3, FLAC, WAV, etc.)`, { variant: "error" });
				return;
			}
		}

		setLoading(true);
		setError("");
		setSuccess("");

		try {
			// First, create the album (without audio files)
			const albumFormData = new FormData();
			albumFormData.append("title", newAlbum.title);
			albumFormData.append("type", "Album");
			albumFormData.append("genre", newAlbum.genre);
			albumFormData.append("contributors", JSON.stringify(newAlbum.contributors));
			albumFormData.append("coverImage", albumCoverImage);
			albumFormData.append("listenCount", newAlbum.listenCount.toString());
			albumFormData.append("publishDate", newAlbum.publishDate); // Use custom publish date

			const albumResponse = await trackAPI.create(albumFormData, token);
			const albumId = albumResponse._id;

			// Then, create each track in the album
			for (let i = 0; i < newAlbum.tracks.length; i++) {
				const track = newAlbum.tracks[i];
				const trackFormData = new FormData();
				trackFormData.append("title", track.title);
				trackFormData.append("type", "Single");
				trackFormData.append("genre", newAlbum.genre); // Inherit from album
				trackFormData.append(
					"contributors",
					JSON.stringify(track.contributors)
				);
				trackFormData.append("audioFile", albumTracks[i]);
				trackFormData.append("album", albumId);
				trackFormData.append("trackNumber", track.trackNumber);
				trackFormData.append("listenCount", newAlbum.listenCount.toString()); // Use album's play count for tracks
				trackFormData.append("publishDate", newAlbum.publishDate); // Use album's publish date for tracks

				// For tracks in an album, we use the album cover image
				trackFormData.append("coverImage", albumCoverImage);

				await trackAPI.create(trackFormData, token);
			}

			setSuccess("Album uploaded successfully!");
			enqueueSnackbar("Album uploaded successfully!", { variant: "success" });

			// Reset form
			setNewAlbum({
				title: "",
				genre: "",
				contributors: [{ name: "", role: "Artist" }],
				tracks: [
					{
						title: "",
						trackNumber: 1,
						contributors: [{ name: "", role: "Artist" }],
					},
				],
				publishDate: new Date().toISOString().split('T')[0], // Reset to today's date
			});
			setAlbumCoverImage(null);
			setAlbumTracks([]);
			setAlbumCoverImagePreview(null);
			setAlbumTrackPreviews([]);

			// Refresh tracks list
			fetchTracks();
		} catch (err) {
			const errorMessage = err.message || "Failed to upload album";
			setError(errorMessage);
			enqueueSnackbar(errorMessage, { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateTrack = async (e) => {
		e.preventDefault();

		if (!editTrack.title || !editTrack.genre) {
			setError("Title and genre are required");
			enqueueSnackbar("Title and genre are required", { variant: "error" });
			return;
		}

		// Validate file types if new files are uploaded
		if (coverImage && !coverImage.type.startsWith('image/')) {
			setError("Cover image must be an image file (JPEG, PNG, etc.)");
			enqueueSnackbar("Cover image must be an image file (JPEG, PNG, etc.)", { variant: "error" });
			return;
		}

		if (audioFile && !audioFile.type.startsWith('audio/')) {
			setError("Audio file must be an audio file (MP3, FLAC, WAV, etc.)");
			enqueueSnackbar("Audio file must be an audio file (MP3, FLAC, WAV, etc.)", { variant: "error" });
			return;
		}

		setLoading(true);
		setError("");
		setSuccess("");

		try {
			// Create FormData for update (only include changed fields)
			const trackData = {
				title: editTrack.title,
				type: editTrack.type,
				genre: editTrack.genre,
				contributors: editTrack.contributors,
				listenCount: editTrack.listenCount,
				publishDate: editTrack.publishDate, // Add publish date
			};

			// If new files are uploaded, include them
			const formData = new FormData();
			Object.keys(trackData).forEach((key) => {
				if (key === "contributors") {
					formData.append(key, JSON.stringify(trackData[key]));
				} else {
					formData.append(key, trackData[key]);
				}
			});

			// Add file uploads if provided
			if (coverImage) {
				formData.append("coverImage", coverImage);
			}

			if (audioFile) {
				formData.append("audioFile", audioFile);
			}

			await trackAPI.update(editingTrack._id, formData, token);

			setSuccess("Track updated successfully!");
			enqueueSnackbar("Track updated successfully!", { variant: "success" });
			setEditDialogOpen(false);
			setEditingTrack(null);
			setCoverImage(null);
			setAudioFile(null);
			setCoverImagePreview(null);
			setAudioFilePreview(null);

			// Refresh tracks list
			fetchTracks();
		} catch (err) {
			const errorMessage = err.message || "Failed to update track";
			setError(errorMessage);
			enqueueSnackbar(errorMessage, { variant: "error" });
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteTrack = async (trackId) => {
		// Check if this is an album with tracks
		const trackToDelete = tracks.find(track => track._id === trackId);
		
		if (trackToDelete && trackToDelete.type === "Album") {
			// Check if this album has tracks
			const albumTracks = tracks.filter(track => track.album === trackId);
			if (albumTracks.length > 0) {
				if (!window.confirm(`This album has ${albumTracks.length} track(s). Deleting this album will also delete all its tracks. Are you sure you want to proceed?`)) {
					return;
				}
			}
		}
		
		if (window.confirm("Are you sure you want to delete this track? This action cannot be undone.")) {
			setLoading(true);
			setError("");
			try {
				await trackAPI.delete(trackId, token);
				setSuccess("Track deleted successfully!");
				enqueueSnackbar("Track deleted successfully!", { variant: "success" });
				fetchTracks(); // Refresh tracks list
			} catch (err) {
				const errorMessage = err.message || "Failed to delete track";
				setError(errorMessage);
				enqueueSnackbar(errorMessage, { variant: "error" });
			} finally {
				setLoading(false);
			}
		}
	};

	const handleEditTrack = async (track) => {
		setEditingTrack(track);
		
		// If this is an album, fetch its tracks for editing
		if (track.type === "Album") {
			try {
				const albumTracks = await trackAPI.getByAlbumId(track._id);
				setAlbumTracks(albumTracks);
			} catch (err) {
				console.error("Failed to fetch album tracks:", err);
				setAlbumTracks([]);
			}
		}
		
		setEditDialogOpen(true);
	};

	// New function to handle editing individual tracks within an album
	const handleEditAlbumTrack = (track) => {
		// Close the current album edit dialog
		setEditDialogOpen(false);
		
		// Open the track edit dialog for the individual track
		setEditingTrack(track);
		setEditDialogOpen(true);
	};

	const handleCloseEditDialog = () => {
		setEditDialogOpen(false);
		setEditingTrack(null);
		setCoverImage(null);
		setAudioFile(null);
		setCoverImagePreview(null);
		setAudioFilePreview(null);
	};

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				<Typography
					variant='h3'
					component='h1'
					gutterBottom
					sx={{
						fontWeight: "bold",
						textAlign: "center",
						background: "linear-gradient(45deg, #f68712 30%, #fb5e8c 90%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						mb: 4,
					}}>
					Admin Dashboard
				</Typography>

				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				{success && (
					<Alert severity='success' sx={{ mb: 2 }}>
						{success}
					</Alert>
				)}

				<Paper
					sx={{
						mb: 4,
						borderRadius: 2,
						boxShadow: 3,
					}}>
					<Tabs
						value={activeTab}
						onChange={handleTabChange}
						centered
						sx={{
							"& .MuiTab-root": {
								fontWeight: "bold",
								fontSize: "1rem",
							},
							"& .Mui-selected": {
								color: "#f68712",
							},
						}}>
						<Tab label='Upload Track' />
						<Tab label='Manage Tracks' />
					</Tabs>
				</Paper>

				{activeTab === 0 && (
					<Paper
						sx={{
							p: 3,
							borderRadius: 2,
							boxShadow: 3,
						}}>
						<Tabs
							value={newTrack.type === "Album" ? 1 : 0}
							onChange={(event, newValue) => {
								setNewTrack({
									...newTrack,
									type: newValue === 1 ? "Album" : "Single",
								});
							}}
							sx={{ mb: 3 }}>
							<Tab label='Upload Single Track' />
							<Tab label='Upload Album' />
						</Tabs>

						{newTrack.type === "Single" ? (
							<>
								<Typography
									variant='h5'
									gutterBottom
									sx={{
										fontWeight: "bold",
										color: "#f68712",
										mb: 3,
									}}>
									Upload New Track
								</Typography>

								<Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
									<TextField
										fullWidth
										label='Title'
										name='title'
										value={newTrack.title}
										onChange={handleInputChange}
										margin='normal'
										required
										variant='outlined'
									/>

									<FormControl fullWidth margin='normal' variant='outlined'>
										<InputLabel>Type</InputLabel>
										<Select
											name='type'
											value={newTrack.type}
											label='Type'
											onChange={handleInputChange}>
											<MenuItem value='Single'>Single</MenuItem>
											<MenuItem value='Album'>Album</MenuItem>
										</Select>
									</FormControl>

									<TextField
										fullWidth
										label='Genre'
										name='genre'
										value={newTrack.genre}
										onChange={handleInputChange}
										margin='normal'
										required
										variant='outlined'
									/>

									<TextField
										fullWidth
										label='Play Count'
										name='listenCount'
										type='number'
										value={newTrack.listenCount}
										onChange={handleInputChange}
										margin='normal'
										variant='outlined'
										InputProps={{ inputProps: { min: 0 } }}
									/>

									<TextField
										fullWidth
										label='Release Date'
										name='publishDate'
										type='date'
										value={newTrack.publishDate}
										onChange={handleInputChange}
										margin='normal'
										variant='outlined'
										InputLabelProps={{ shrink: true }}
									/>

									{/* Sticky Apply to All Button for Single Track */}
									<Box
										sx={{
											position: "sticky",
											top: 50,
											zIndex: 100,
											backgroundColor: "background.paper",
											padding: 2,
											borderRadius: 2,
											boxShadow: 3,
											mb: 3,
										}}>
										<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#f68712" }}>
											Quick Actions
										</Typography>
										<Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
											<Button
												onClick={() => {
													// Apply genre to title if both are empty
													if (!newTrack.title && newTrack.genre) {
														setNewTrack({
															...newTrack,
															title: newTrack.genre
														});
													}
												}}
												variant='outlined'
												size='small'>
												Use Genre as Title
											</Button>
										</Stack>
									</Box>

									<Typography
										variant='h6'
										gutterBottom
										sx={{
											mt: 3,
											fontWeight: "bold",
											color: "#f68712",
										}}>
										Contributors
									</Typography>

									{newTrack.contributors.map((contributor, index) => (
										<Box
											key={index}
											sx={{
												display: "flex",
												gap: 2,
												mb: 2,
												alignItems: "center",
											}}>
											<TextField
												label='Name'
												value={contributor.name}
												onChange={(e) =>
													handleContributorChange(index, "name", e.target.value)
												}
												required
												variant='outlined'
												fullWidth
											/>
											<FormControl variant='outlined'>
												<InputLabel>Role</InputLabel>
												<Select
													value={contributor.role}
													label='Role'
													onChange={(e) =>
														handleContributorChange(
															index,
															"role",
															e.target.value
														)
													}>
													<MenuItem value='Artist'>Artist</MenuItem>
													<MenuItem value='Producer'>Producer</MenuItem>
													<MenuItem value='Composer'>Composer</MenuItem>
													<MenuItem value='Lyricist'>Lyricist</MenuItem>
													<MenuItem value='Arranger'>Arranger</MenuItem>
													<MenuItem value='Engineer'>Engineer</MenuItem>
													<MenuItem value='Performer'>Performer</MenuItem>
													<MenuItem value='Writer'>Writer</MenuItem>
													<MenuItem value='Other'>Other</MenuItem>
												</Select>
											</FormControl>
											{newTrack.contributors.length > 1 && (
												<IconButton
													onClick={() => removeContributor(index)}
													color='error'>
													<Delete />
												</IconButton>
											)}
										</Box>
									))}

									<Button
										startIcon={<Add />}
										onClick={() => addContributor()}
										variant='outlined'
										sx={{ mb: 2 }}>
										Add Contributor
									</Button>

									<Typography
										variant='h6'
										gutterBottom
										sx={{
											mt: 3,
											fontWeight: "bold",
											color: "#f68712",
										}}>
										Files
									</Typography>

									<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
										<Button
											component='label'
											variant='outlined'
											startIcon={<Image />}
											sx={{
												borderColor: "#f68712",
												color: "#f68712",
												"&:hover": {
													borderColor: "#d1730f",
													backgroundColor: "rgba(246, 135, 18, 0.04)",
												},
											}}>
											Upload Cover Image
											<input
												type='file'
												hidden
												accept='image/jpeg,image/png,image/jpg'
												onChange={(e) => handleFileChange(e, "cover")}
											/>
										</Button>
										{coverImage && (
											<Typography variant='body2' sx={{ alignSelf: "center" }}>
												{coverImage.name}
											</Typography>
										)}
									</Box>

									{/* Cover Image Preview */}
									{coverImagePreview && (
										<Box sx={{ mb: 2 }}>
											<Typography variant='subtitle2' sx={{ mb: 1 }}>
												Cover Image Preview:
											</Typography>
											<img
												src={coverImagePreview}
												alt='Cover preview'
												style={{
													maxWidth: "200px",
													maxHeight: "200px",
													objectFit: "contain",
													border: "1px solid #ddd",
													borderRadius: "4px",
												}}
											/>
											<Typography variant='body2' sx={{ mt: 1 }}>
												<strong>File:</strong> {coverImage?.name}
											</Typography>
											<Typography variant='body2'>
												<strong>Size:</strong>{" "}
												{coverImage && (coverImage.size / (1024 * 1024)).toFixed(2)} MB
											</Typography>
										</Box>
									)}

									<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
										<Button
											component='label'
											variant='outlined'
											startIcon={<UploadFile />}
											sx={{
												borderColor: "#f68712",
												color: "#f68712",
												"&:hover": {
													borderColor: "#d1730f",
													backgroundColor: "rgba(246, 135, 18, 0.04)",
												},
											}}>
											Upload Audio File
											<input
												type='file'
												hidden
												accept='audio/mpeg,audio/flac,audio/wav,audio/aac'
												onChange={(e) => handleFileChange(e, "audio")}
											/>
										</Button>
										{audioFile && (
											<Typography variant='body2' sx={{ alignSelf: "center" }}>
												{audioFile.name}
											</Typography>
										)}
									</Box>

									{/* Audio File Preview */}
									{audioFilePreview && (
										<Box sx={{ mb: 2 }}>
											<Typography variant='subtitle2' sx={{ mb: 1 }}>
												Audio File Preview:
											</Typography>
											<Paper sx={{ p: 2, bgcolor: "grey.100" }}>
												<Typography variant='body2'>
													<strong>Name:</strong> {audioFilePreview.name}
												</Typography>
												<Typography variant='body2'>
													<strong>Size:</strong>{" "}
													{(audioFilePreview.size / (1024 * 1024)).toFixed(2)} MB
												</Typography>
												<Typography variant='body2'>
													<strong>Type:</strong> {audioFilePreview.type}
												</Typography>
												<Typography variant='body2'>
													<strong>Last Modified:</strong>{" "}
													{new Date(audioFilePreview.lastModified).toLocaleString()}
												</Typography>
											</Paper>
										</Box>
									)}

									<Box
										sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
										<Button
											type='submit'
											variant='contained'
											size='large'
											disabled={loading}
											sx={{
												background:
													"linear-gradient(45deg, #f68712 30%, #fb5e8c 90%)",
												boxShadow: "0 3px 5px 2px rgba(246, 135, 18, .3)",
												"&:hover": {
													background:
														"linear-gradient(45deg, #d1730f 30%, #00a650 90%)",
												},
											}}>
											{loading ? (
												<CircularProgress size={24} />
											) : (
												"Upload Track"
											)}
										</Button>
									</Box>
								</Box>
							</>
						) : (
							<>
								<Typography
									variant='h5'
									gutterBottom
									sx={{
										fontWeight: "bold",
										color: "#f68712",
										mb: 3,
									}}>
									Upload New Album
								</Typography>
<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
										<Button
											component='label'
											variant='outlined'
											startIcon={<UploadFile />}
											sx={{
												borderColor: "#f68712",
												color: "#f68712",
												"&:hover": {
													borderColor: "#d1730f",
													backgroundColor: "rgba(246, 135, 18, 0.04)",
												},
											}}>
											Upload Track Audio Files
											<input
												type='file'
												hidden
												accept='audio/mpeg,audio/flac,audio/wav,audio/aac'
												onChange={(e) => handleFileChange(e, "tracks", true)}
												multiple
											/>
										</Button>
										{albumTracks.length > 0 && (
											<Typography variant='body2' sx={{ alignSelf: "center" }}>
												{albumTracks.length} file(s) selected
											</Typography>
										)}
									</Box>

									{/* Album Track Previews */}
									{albumTrackPreviews.length > 0 && (
										<Box sx={{ mb: 2 }}>
											<Typography variant='subtitle2' sx={{ mb: 1 }}>
												Track Files Preview:
											</Typography>
											{albumTrackPreviews.map((preview, index) => (
												<Paper key={index} sx={{ p: 2, mb: 1, bgcolor: "grey.100" }}>
													<Typography variant='body2'>
														<strong>Track {index + 1}:</strong> {preview.name}
													</Typography>
													<Typography variant='body2'>
														<strong>Size:</strong>{" "}
														{(preview.size / (1024 * 1024)).toFixed(2)} MB
													</Typography>
													<Typography variant='body2'>
														<strong>Type:</strong> {preview.type}
													</Typography>
													<Typography variant='body2'>
														<strong>Last Modified:</strong>{" "}
														{new Date(preview.lastModified).toLocaleString()}
													</Typography>
												</Paper>
											))}
										</Box>
									)}
								<Box
									component='form'
									onSubmit={handleAlbumSubmit}
									sx={{ mt: 2 }}>
									<TextField
										fullWidth
										label='Album Title'
										name='title'
										value={newAlbum.title}
										onChange={(e) => handleInputChange(e, false, true)}
										margin='normal'
										required
										variant='outlined'
									/>

									<TextField
										fullWidth
										label='Genre'
										name='genre'
										value={newAlbum.genre}
										onChange={(e) => handleInputChange(e, false, true)}
										margin='normal'
										required
										variant='outlined'
									/>

									<TextField
										fullWidth
										label='Play Count'
										name='listenCount'
										type='number'
										value={newAlbum.listenCount}
										onChange={(e) => handleInputChange(e, false, true)}
										margin='normal'
										variant='outlined'
										InputProps={{ inputProps: { min: 0 } }}
									/>

									<TextField
										fullWidth
										label='Release Date'
										name='publishDate'
										type='date'
										value={newAlbum.publishDate}
										onChange={(e) => handleInputChange(e, false, true)}
										margin='normal'
										variant='outlined'
										InputLabelProps={{ shrink: true }}
									/>

									<Typography
										variant='h6'
										gutterBottom
										sx={{
											mt: 3,
											fontWeight: "bold",
											color: "#f68712",
										}}>
										Album Contributors
									</Typography>

									{newAlbum.contributors.map((contributor, index) => (
										<Box
											key={index}
											sx={{
												display: "flex",
												gap: 2,
												mb: 2,
												alignItems: "center",
											}}>
											<TextField
												label='Name'
												value={contributor.name}
												onChange={(e) =>
													handleContributorChange(
														index,
														"name",
														e.target.value,
														false,
														true
													)
												}
												required
												variant='outlined'
												fullWidth
											/>
											<FormControl variant='outlined'>
												<InputLabel>Role</InputLabel>
												<Select
													value={contributor.role}
													label='Role'
													onChange={(e) =>
														handleContributorChange(
															index,
															"role",
															e.target.value,
															false,
															true
														)
													}>
													<MenuItem value='Artist'>Artist</MenuItem>
													<MenuItem value='Producer'>Producer</MenuItem>
													<MenuItem value='Composer'>Composer</MenuItem>
													<MenuItem value='Lyricist'>Lyricist</MenuItem>
													<MenuItem value='Arranger'>Arranger</MenuItem>
													<MenuItem value='Engineer'>Engineer</MenuItem>
													<MenuItem value='Performer'>Performer</MenuItem>
													<MenuItem value='Writer'>Writer</MenuItem>
													<MenuItem value='Other'>Other</MenuItem>
												</Select>
											</FormControl>
											{newAlbum.contributors.length > 1 && (
												<IconButton
													onClick={() => removeContributor(index, false, true)}
													color='error'>
													<Delete />
												</IconButton>
											)}
										</Box>
									))}

									<Button
										startIcon={<Add />}
										onClick={() => addContributor(false, true)}
										variant='outlined'
										sx={{ mb: 2 }}>
										Add Contributor
									</Button>

									{/* Sticky Apply to All Buttons Container */}
									<Box
										sx={{
											position: "sticky",
											top: 50,
											zIndex: 100,
											backgroundColor: "background.paper",
											padding: 2,
											borderRadius: 2,
											boxShadow: 3,
											mb: 3,
										}}>
										<Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#f68712" }}>
											Quick Actions
										</Typography>
										<Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
											{/* Apply to All Button */}
											{newAlbum.contributors.length > 0 && (
												<Button
													onClick={applyContributorsToAllTracks}
													variant='contained'
													size='small'>
													Apply Contributors to All Tracks
												</Button>
											)}
											
											{/* Apply album title to all tracks button */}
											{newAlbum.title && (
												<Button
													onClick={applyAlbumTitleToAllTracks}
													variant='outlined'
													size='small'>
													Apply Album Title to All Tracks
												</Button>
											)}
											
											{/* Apply genre to all tracks button */}
											{newAlbum.genre && (
												<Button
													onClick={applyGenreToAllTracks}
													variant='outlined'
													size='small'>
													Apply Genre to All Tracks
												</Button>
											)}
										</Stack>
									</Box>

									<Typography
										variant='h6'
										gutterBottom
										sx={{
											mt: 3,
											fontWeight: "bold",
											color: "#f68712",
										}}>
										Tracks
									</Typography>

									{newAlbum.tracks.map((track, trackIndex) => (
										<Paper
											key={trackIndex}
											sx={{ p: 2, mb: 2, borderRadius: 2 }}>
											<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
												<Typography variant='h6' sx={{ flexGrow: 1 }}>
													Track {track.trackNumber}
												</Typography>
												{newAlbum.tracks.length > 1 && (
													<IconButton
														onClick={() => removeAlbumTrack(trackIndex)}
														color='error'>
														<Delete />
													</IconButton>
												)}
											</Box>

											<TextField
												fullWidth
												label='Track Title'
												name='title'
												value={track.title}
												onChange={(e) =>
													handleInputChange(e, false, true, true, trackIndex)
												}
												margin='normal'
												required
												variant='outlined'
											/>

											<TextField
												fullWidth
												label='Track Number'
												name='trackNumber'
												type='number'
												value={track.trackNumber}
												onChange={(e) => {
													const updatedTracks = [...newAlbum.tracks];
													updatedTracks[trackIndex] = {
														...updatedTracks[trackIndex],
														trackNumber: parseInt(e.target.value) || 1,
													};
													setNewAlbum({
														...newAlbum,
														tracks: updatedTracks,
													});
												}}
												margin='normal'
												variant='outlined'
											/>

											<Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
												Track Contributors
											</Typography>

											{track.contributors.map(
												(contributor, contributorIndex) => (
													<Box
														key={contributorIndex}
														sx={{
															display: "flex",
															gap: 2,
															mb: 2,
															alignItems: "center",
														}}>
														<TextField
															label='Name'
															value={contributor.name}
															onChange={(e) =>
																handleContributorChange(
																	contributorIndex,
																	"name",
																	e.target.value,
																	false,
																	true,
																	true,
																	trackIndex
																)
															}
															required
															variant='outlined'
															fullWidth
														/>
														<FormControl variant='outlined'>
															<InputLabel>Role</InputLabel>
															<Select
																value={contributor.role}
																label='Role'
																onChange={(e) =>
																	handleContributorChange(
																		contributorIndex,
																		"role",
																		e.target.value,
																		false,
																		true,
																		true,
																		trackIndex
																	)
																}>
																<MenuItem value='Artist'>Artist</MenuItem>
																<MenuItem value='Producer'>Producer</MenuItem>
																<MenuItem value='Composer'>Composer</MenuItem>
																<MenuItem value='Lyricist'>Lyricist</MenuItem>
																<MenuItem value='Arranger'>Arranger</MenuItem>
																<MenuItem value='Engineer'>Engineer</MenuItem>
																<MenuItem value='Performer'>Performer</MenuItem>
																<MenuItem value='Writer'>Writer</MenuItem>
																<MenuItem value='Other'>Other</MenuItem>
															</Select>
														</FormControl>
														{track.contributors.length > 1 && (
															<IconButton
																onClick={() =>
																	removeContributor(
																		contributorIndex,
																		false,
																		true,
																		true,
																		trackIndex
																	)
																}
																color='error'>
																<Delete />
															</IconButton>
														)}
													</Box>
												)
											)}

											<Button
												startIcon={<Add />}
												onClick={() =>
													addContributor(false, true, true, trackIndex)
												}
												variant='outlined'
												size='small'>
												Add Contributor
											</Button>
										</Paper>
									))}

									<Button
										startIcon={<Add />}
										onClick={addAlbumTrack}
										variant='outlined'
										sx={{ mb: 2 }}>
										Add Track
									</Button>

									<Typography
										variant='h6'
										gutterBottom
										sx={{
											mt: 3,
											fontWeight: "bold",
											color: "#f68712",
										}}>
										Files
									</Typography>

									<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
										<Button
											component='label'
											variant='outlined'
											startIcon={<Image />}
											sx={{
												borderColor: "#f68712",
												color: "#f68712",
												"&:hover": {
													borderColor: "#d1730f",
													backgroundColor: "rgba(246, 135, 18, 0.04)",
												},
											}}>
											Upload Album Cover Image
											<input
												type='file'
												hidden
												accept='image/jpeg,image/png,image/jpg'
												onChange={(e) => handleFileChange(e, "cover", true)}
											/>
										</Button>
										{albumCoverImage && (
											<Typography variant='body2' sx={{ alignSelf: "center" }}>
												{albumCoverImage.name}
											</Typography>
										)}
									</Box>

									{/* Album Cover Image Preview */}
									{albumCoverImagePreview && (
										<Box sx={{ mb: 2 }}>
											<Typography variant='subtitle2' sx={{ mb: 1 }}>
												Album Cover Preview:
											</Typography>
											<img
												src={albumCoverImagePreview}
												alt='Album cover preview'
												style={{
													maxWidth: "200px",
													maxHeight: "200px",
													objectFit: "contain",
													border: "1px solid #ddd",
													borderRadius: "4px",
												}}
											/>
											<Typography variant='body2' sx={{ mt: 1 }}>
												<strong>File:</strong> {albumCoverImage?.name}
											</Typography>
											<Typography variant='body2'>
												<strong>Size:</strong>{" "}
												{albumCoverImage && (albumCoverImage.size / (1024 * 1024)).toFixed(2)} MB
											</Typography>
										</Box>
									)}

									

									<Box
										sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
										<Button
											type='submit'
											variant='contained'
											size='large'
											disabled={loading}
											sx={{
												background:
													"linear-gradient(45deg, #f68712 30%, #fb5e8c 90%)",
												boxShadow: "0 3px 5px 2px rgba(246, 135, 18, .3)",
												"&:hover": {
													background:
														"linear-gradient(45deg, #d1730f 30%, #00a650 90%)",
												},
											}}>
											{loading ? (
												<CircularProgress size={24} />
											) : (
												"Upload Album"
											)}
										</Button>
									</Box>
								</Box>
							</>
						)}
					</Paper>
				)}

				{activeTab === 1 && (
					<Paper
						sx={{
							p: 3,
							borderRadius: 2,
							boxShadow: 3,
						}}>
						<Typography
							variant='h5'
							gutterBottom
							sx={{
								fontWeight: "bold",
								color: "#f68712",
								mb: 3,
							}}>
							Manage Tracks
						</Typography>

						{loading && tracks.length === 0 ? (
							<Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
								<CircularProgress />
							</Box>
						) : tracks.length === 0 ? (
							<Alert severity='info'>No tracks available</Alert>
						) : (
							<Grid container spacing={3}>
								{tracks
									.filter(
										(track) =>
											track.type === "Single" &&
											(!track.album || track.album === null)
									)
									.map((track) => (
										<Grid
											item
											xs={12}
											sm={6}
											md={4}
											key={track._id}
											sx={{ minWidth: 280, maxWidth: 280 }}>
											<Card
												sx={{
													height: "100%",
													display: "flex",
													flexDirection: "column",
													transition: "transform 0.2s, box-shadow 0.2s",
													"&:hover": {
														transform: "translateY(-4px)",
														boxShadow: 6,
													},
													borderRadius: 2,
													maxHeight: 360,
													minWidth: 280,
													maxWidth: 280,
												}}>
												{track.coverImage ? (
													<CardMedia
														component="img"
														height="180"
														image={getCoverImageUrl(track.coverImage)}
														alt={track.title}
														sx={{
															objectFit: "contain",
															backgroundColor: "transparent",
														}}
													/>
												) : (
													<Box
														sx={{
															height: 180,
															backgroundColor: "#f5f5f5",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}>
														<Image sx={{ fontSize: 48, color: "#9e9e9e" }} />
													</Box>
												)}
												<CardContent sx={{ flexGrow: 1, py: 1.5, px: 1.5 }}>
													<Typography
														gutterBottom
														variant="h6"
														component="div"
														sx={{
															fontWeight: 600,
															fontSize: "0.9rem",
															lineHeight: 1.2,
															mb: 0.5,
															display: "-webkit-box",
															WebkitLineClamp: 2,
															WebkitBoxOrient: "vertical",
															overflow: "hidden",
															minHeight: "2.2em",
														}}>
														{track.title}
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
														sx={{
															mb: 1.5,
															display: "flex",
															alignItems: "center",
															gap: 0.5,
															fontSize: "0.8rem",
														}}>
														<Person fontSize="small" sx={{ fontSize: "0.9rem" }} />
														{track.contributors && track.contributors.length > 0
															? track.contributors.find((c) => c.role === "Artist")?.name ||
															  track.contributors[0].name ||
															  "Unknown Artist"
															: "Unknown Artist"}
													</Typography>
													<Stack
														direction="row"
														spacing={0.5}
														sx={{ mb: 1.5, flexWrap: "wrap", gap: 0.5 }}>
														<Chip
															label={track.genre}
															size="small"
															variant="outlined"
															sx={{
																fontSize: "0.65rem",
																height: 20,
																borderColor: "primary.main",
																color: "primary.main",
															}}
														/>
														<Chip
															icon={<AccessTime sx={{ fontSize: "0.7rem" }} />}
															label={
																track.duration
																	? formatDuration(track.duration)
																	: "0:00"
															}
															size="small"
															variant="filled"
															sx={{
																fontSize: "0.65rem",
																height: 20,
																backgroundColor: "grey.100",
																color: "text.secondary",
															}}
														/>
													</Stack>
												</CardContent>
												<Divider />
												<Box
													sx={{
														p: 1.5,
														pt: 1,
														display: "flex",
														justifyContent: "flex-end",
													}}>
													<Button
														size="small"
														onClick={() => handleEditTrack(track)}
														sx={{ mr: 1 }}>
														<Edit />
													</Button>
													<Button
														size="small"
														color="error"
														onClick={() => handleDeleteTrack(track._id)}>
														<Delete />
													</Button>
												</Box>
											</Card>
										</Grid>
									))}
							</Grid>
						)}

						<Typography
							variant='h5'
							gutterBottom
							sx={{
								fontWeight: "bold",
								color: "#f68712",
								mb: 3,
								mt: 5,
							}}>
							Manage Albums
						</Typography>

						{loading && tracks.length === 0 ? (
							<Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
								<CircularProgress />
							</Box>
						) : tracks.length === 0 ? (
							<Alert severity='info'>No albums available</Alert>
						) : (
							<Grid container spacing={3}>
								{tracks
									.filter((track) => track.type === "Album")
									.map((track) => (
										<Grid
											item
											xs={12}
											sm={6}
											md={4}
											key={track._id}
											sx={{ minWidth: 280, maxWidth: 280 }}>
											<Card
												sx={{
													height: "100%",
													display: "flex",
													flexDirection: "column",
													transition: "transform 0.2s, box-shadow 0.2s",
													"&:hover": {
														transform: "translateY(-4px)",
														boxShadow: 6,
													},
													borderRadius: 2,
													maxHeight: 360,
													minWidth: 280,
													maxWidth: 280,
												}}>
												{track.coverImage ? (
													<CardMedia
														component="img"
														height="180"
														image={getCoverImageUrl(track.coverImage)}
														alt={track.title}
														sx={{
															objectFit: "contain",
															backgroundColor: "transparent",
														}}
													/>
												) : (
													<Box
														sx={{
															height: 180,
															backgroundColor: "#f5f5f5",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}>
														<Image sx={{ fontSize: 48, color: "#9e9e9e" }} />
													</Box>
												)}
												<CardContent sx={{ flexGrow: 1, py: 1.5, px: 1.5 }}>
													<Typography
														gutterBottom
														variant="h6"
														component="div"
														sx={{
															fontWeight: 600,
															fontSize: "0.9rem",
															lineHeight: 1.2,
															mb: 0.5,
															display: "-webkit-box",
															WebkitLineClamp: 2,
															WebkitBoxOrient: "vertical",
															overflow: "hidden",
															minHeight: "2.2em",
														}}>
														{track.title}
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
														sx={{
															mb: 1.5,
															display: "flex",
															alignItems: "center",
															gap: 0.5,
															fontSize: "0.8rem",
														}}>
														<Person fontSize="small" sx={{ fontSize: "0.9rem" }} />
														{track.contributors && track.contributors.length > 0
															? track.contributors.find((c) => c.role === "Artist")?.name ||
															  track.contributors[0].name ||
															  "Unknown Artist"
															: "Unknown Artist"}
													</Typography>
													<Stack
														direction="row"
														spacing={0.5}
														sx={{ mb: 1.5, flexWrap: "wrap", gap: 0.5 }}>
														<Chip
															label={track.genre}
															size="small"
															variant="outlined"
															sx={{
																fontSize: "0.65rem",
																height: 20,
																borderColor: "primary.main",
																color: "primary.main",
															}}
														/>
														<Chip
															icon={<AlbumIcon sx={{ fontSize: "0.7rem" }} />}
															label="Album"
															size="small"
															variant="filled"
															sx={{
																fontSize: "0.65rem",
																height: 20,
																backgroundColor: "grey.100",
																color: "text.secondary",
															}}
														/>
													</Stack>
												</CardContent>
												<Divider />
												<Box
													sx={{
														p: 1.5,
														pt: 1,
														display: "flex",
														justifyContent: "flex-end",
													}}>
													<Button
														size="small"
														onClick={() => handleEditTrack(track)}
														sx={{ mr: 1 }}>
														<Edit />
													</Button>
													<Button
														size="small"
														color="error"
														onClick={() => handleDeleteTrack(track._id)}>
														<Delete />
													</Button>
												</Box>
											</Card>
										</Grid>
									))}
							</Grid>
						)}
					</Paper>
				)}
			</motion.div>

			{/* Edit Track Dialog */}
			<Dialog
				open={editDialogOpen}
				onClose={handleCloseEditDialog}
				maxWidth='sm'
				fullWidth>
				<DialogTitle>Edit Track</DialogTitle>
				<DialogContent>
					{editingTrack && (
						<Box component='form' onSubmit={handleUpdateTrack} sx={{ pt: 2 }}>
							<TextField
								fullWidth
								label='Title'
								name='title'
								value={editTrack.title}
								onChange={(e) => handleInputChange(e, true)}
								margin='normal'
								variant='outlined'
							/>
							<FormControl fullWidth margin='normal' variant='outlined'>
								<InputLabel>Type</InputLabel>
								<Select
									name='type'
									value={editTrack.type}
									label='Type'
									onChange={(e) => handleInputChange(e, true)}>
									<MenuItem value='Single'>Single</MenuItem>
									<MenuItem value='Album'>Album</MenuItem>
								</Select>
							</FormControl>
							<TextField
								fullWidth
								label='Genre'
								name='genre'
								value={editTrack.genre}
								onChange={(e) => handleInputChange(e, true)}
								margin='normal'
								variant='outlined'
							/>

							<TextField
								fullWidth
								label='Play Count'
								name='listenCount'
								type='number'
								value={editTrack.listenCount}
								onChange={(e) => handleInputChange(e, true)}
								margin='normal'
								variant='outlined'
								InputProps={{ inputProps: { min: 0 } }}
							/>

							<TextField
								fullWidth
								label='Release Date'
								name='publishDate'
								type='date'
								value={editTrack.publishDate}
								onChange={(e) => handleInputChange(e, true)}
								margin='normal'
								variant='outlined'
								InputLabelProps={{ shrink: true }}
							/>

							<Typography
								variant='h6'
								gutterBottom
								sx={{ mt: 3, fontWeight: "bold" }}>
								Contributors
							</Typography>

							{editTrack.contributors.map((contributor, index) => (
								<Box
									key={index}
									sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
									<TextField
										label='Name'
										value={contributor.name}
										onChange={(e) =>
											handleContributorChange(
												index,
												"name",
												e.target.value,
												true
											)
										}
										variant='outlined'
										fullWidth
									/>
									<FormControl variant='outlined'>
										<InputLabel>Role</InputLabel>
										<Select
											value={contributor.role}
											label='Role'
											onChange={(e) =>
												handleContributorChange(
													index,
													"role",
													e.target.value,
													true
												)
											}>
											<MenuItem value='Artist'>Artist</MenuItem>
											<MenuItem value='Producer'>Producer</MenuItem>
											<MenuItem value='Composer'>Composer</MenuItem>
											<MenuItem value='Lyricist'>Lyricist</MenuItem>
											<MenuItem value='Arranger'>Arranger</MenuItem>
											<MenuItem value='Engineer'>Engineer</MenuItem>
											<MenuItem value='Performer'>Performer</MenuItem>
											<MenuItem value='Writer'>Writer</MenuItem>
											<MenuItem value='Other'>Other</MenuItem>
										</Select>
									</FormControl>
									{editTrack.contributors.length > 1 && (
										<IconButton
											onClick={() => removeContributor(index, true)}
											color='error'>
											<Delete />
										</IconButton>
									)}
								</Box>
							))}

							<Button
								startIcon={<Add />}
								onClick={() => addContributor(true)}
								variant='outlined'
								sx={{ mb: 2 }}>
								Add Contributor
							</Button>

							{/* Album Tracks Section - Only show for albums */}
							{editingTrack.type === "Album" && albumTracks.length > 0 && (
								<>
									<Typography
										variant='h6'
										gutterBottom
										sx={{ mt: 3, fontWeight: "bold" }}>
										Album Tracks
									</Typography>
									{albumTracks.map((track, index) => (
										<Paper key={track._id} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
											<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
												<Typography variant='subtitle1' sx={{ flexGrow: 1 }}>
													Track {index + 1}: {track.title}
												</Typography>
												<IconButton
													size='small'
													onClick={() => handleEditAlbumTrack(track)}
													sx={{ ml: 1 }}>
													<Edit />
												</IconButton>
											</Box>
											<Typography variant='body2' color='text.secondary'>
												Duration: {formatDuration(track.duration)}
											</Typography>
											{track.contributors && track.contributors.length > 0 && (
												<Typography variant='body2' color='text.secondary'>
													Contributors: {track.contributors.map(c => `${c.name} (${c.role})`).join(', ')}
												</Typography>
											)}
										</Paper>
									))}
								</>
							)}

							<Typography
								variant='h6'
								gutterBottom
								sx={{ mt: 3, fontWeight: "bold" }}>
								Update Files (Optional)
							</Typography>

							<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
								<Button
									component='label'
									variant='outlined'
									startIcon={<Image />}
									sx={{
										borderColor: "#f68712",
										color: "#f68712",
										"&:hover": {
											borderColor: "#d1730f",
											backgroundColor: "rgba(246, 135, 18, 0.04)",
										},
									}}>
									Update Cover Image
									<input
										type='file'
										hidden
										accept='image/jpeg,image/png,image/jpg'
										onChange={(e) => handleFileChange(e, "cover")}
									/>
								</Button>
								{coverImage && (
									<Typography variant='body2' sx={{ alignSelf: "center" }}>
										{coverImage.name}
									</Typography>
								)}
							</Box>

							{/* Cover Image Preview */}
							{coverImagePreview && (
								<Box sx={{ mb: 2 }}>
									<Typography variant='subtitle2' sx={{ mb: 1 }}>
										Cover Image Preview:
									</Typography>
									<img
										src={coverImagePreview}
										alt='Cover preview'
										style={{
											maxWidth: "200px",
											maxHeight: "200px",
											objectFit: "contain",
											border: "1px solid #ddd",
											borderRadius: "4px",
										}}
									/>
								</Box>
							)}

							{/* Audio file update - only for single tracks */}
							{editingTrack.type === "Single" && (
								<>
									<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
										<Button
											component='label'
											variant='outlined'
											startIcon={<UploadFile />}
											sx={{
												borderColor: "#f68712",
												color: "#f68712",
												"&:hover": {
													borderColor: "#d1730f",
													backgroundColor: "rgba(246, 135, 18, 0.04)",
												},
											}}>
											Update Audio File
											<input
												type='file'
												hidden
												accept='audio/mpeg,audio/flac,audio/wav,audio/aac'
												onChange={(e) => handleFileChange(e, "audio")}
											/>
										</Button>
										{audioFile && (
											<Typography variant='body2' sx={{ alignSelf: "center" }}>
												{audioFile.name}
											</Typography>
										)}
									</Box>

									{/* Audio File Preview */}
									{audioFilePreview && (
										<Box sx={{ mb: 2 }}>
											<Typography variant='subtitle2' sx={{ mb: 1 }}>
												Audio File Preview:
											</Typography>
											<Paper sx={{ p: 2, bgcolor: "grey.100" }}>
												<Typography variant='body2'>
													<strong>Name:</strong> {audioFilePreview.name}
												</Typography>
												<Typography variant='body2'>
													<strong>Size:</strong>{" "}
													{(audioFilePreview.size / (1024 * 1024)).toFixed(2)} MB
												</Typography>
												<Typography variant='body2'>
													<strong>Type:</strong> {audioFilePreview.type}
												</Typography>
											</Paper>
										</Box>
									)}
								</>
							)}
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEditDialog}>Cancel</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={handleUpdateTrack}
						disabled={loading}>
						{loading ? <CircularProgress size={24} /> : "Update"}
					</Button>
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							if (editingTrack) {
								handleDeleteTrack(editingTrack._id);
								handleCloseEditDialog();
							}
						}}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default AdminDashboard;