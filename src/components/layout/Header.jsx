import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Container,
	TextField,
	InputAdornment,
	Chip,
	Stack,
	IconButton,
	Badge,
	Menu,
	MenuItem,
	Divider,
	Switch,
	FormControlLabel,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import {
	Search,
	ShoppingCart,
	Person,
	Favorite,
	KeyboardArrowDown,
	Menu as MenuIcon,
	Brightness4,
	Brightness7,
	Info,
	ContactMail,
	Close,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { trackAPI } from "../../utils/api";

const Header = ({ mode, toggleMode }) => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All categories");
	const [categoryAnchor, setCategoryAnchor] = useState(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [genres, setGenres] = useState([]);

	// Fetch genres on component mount
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const genreList = await trackAPI.getGenres();
				setGenres(genreList);
			} catch (err) {
				console.error("Failed to fetch genres for header:", err);
			}
		};

		fetchGenres();
	}, []);

	// Set search query from URL when location changes
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const query = searchParams.get("q") || "";
		setSearchQuery(query);
	}, [location]);

	const staticCategories = [];

	// Combine static categories with dynamic genres
	const allCategories = [...staticCategories, ...genres];

	const handleLogout = () => {
		logout();
		window.location.href = "/";
	};

	const handleCategoryClick = (event) => {
		setCategoryAnchor(event.currentTarget);
	};

	const handleCategoryClose = () => {
		setCategoryAnchor(null);
	};

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
		handleCategoryClose();
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	return (
		<AppBar
			position='static'
			elevation={1}
			sx={{
				mb: 0,
				backgroundColor: "background.paper",
				color: "text.primary",
				borderBottom: "1px solid",
				borderColor: "divider",
			}}>
			<Container maxWidth='xl'>
				{/* Restructured toolbar for mobile: logo left, search center, menu right */}
				<Toolbar
					disableGutters
					sx={{
						py: 1,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: { xs: 1, sm: 2, md: "35px" },
					}}>
					{/* Logo on the far left */}
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<a href='/'>
							<img 
								src='/images/orange.png' 
								alt='AudioHub Logo' 
								style={{ 
									width: "120px",
								}} 
							/>
						</a>
					</Box>

					{/* Search Bar - Centered on mobile, hidden on smallest screens */}
					<Box
						component='form'
						onSubmit={handleSearch}
						sx={{
							flexGrow: 1,
							maxWidth: { xs: 150, sm: 300, md: 500 },
							mx: { xs: 1, sm: 2 },
							display: { xs: "none", sm: "block" },
						}}>
						<TextField
							fullWidth
							size='small'
							placeholder='Search music...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Search color='action' />
									</InputAdornment>
								),
							}}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "background.default",
								},
							}}
						/>
					</Box>

					{/* Action Buttons */}
					<Stack direction='row' spacing={0.5} alignItems='center'>
						{/* Category Selector - Hidden on mobile */}
						<Box sx={{ display: { xs: "none", md: "block" } }}>
							<Button
								onClick={handleCategoryClick}
								endIcon={<KeyboardArrowDown />}
								sx={{
									color: "text.primary",
									textTransform: "none",
									fontWeight: 500,
									minWidth: "150px",
									justifyContent: "space-between",
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 1,
									px: 2,
									py: 1,
								}}>
								{selectedCategory}
							</Button>
							<Menu
								anchorEl={categoryAnchor}
								open={Boolean(categoryAnchor)}
								onClose={handleCategoryClose}
								PaperProps={{
									sx: { minWidth: 200 },
								}}>
								{allCategories.map((category) => (
									<MenuItem
										key={category}
										onClick={() => handleCategorySelect(category)}
										selected={category === selectedCategory}>
										{category}
									</MenuItem>
								))}
							</Menu>
						</Box>

						{/* Light/Dark Mode Switch - Improved styling without icon duplication */}
						<FormControlLabel
							control={
								<Switch
									checked={mode === "dark"}
									onChange={toggleMode}
									size="small"
								/>
							}
							label={mode === "dark" ? <Brightness4 fontSize="small" /> : <Brightness7 fontSize="small" />}
              labelPlacement="start"
              style={{marginLeft: '15px'}}
						
						/>
						
						{/* About and Contact Buttons - Hidden on mobile */}
						<Button
							component={Link}
							to='/about'
							startIcon={<Info />}
							variant='text'
							size='small'
							sx={{
								textTransform: "none",
								color: "text.primary",
								display: { xs: "none", sm: "inline-flex" },
								minWidth: { sm: 80, md: 'auto' },
								fontSize: { sm: '0.75rem', md: '0.875rem' },
								px: { sm: 1, md: 2 }
							}}>
							About
						</Button>
						
						<Button
							component={Link}
							to='/contact'
							startIcon={<ContactMail />}
							variant='text'
							size='small'
							sx={{
								textTransform: "none",
								color: "text.primary",
								display: { xs: "none", sm: "inline-flex" },
								minWidth: { sm: 80, md: 'auto' },
								fontSize: { sm: '0.75rem', md: '0.875rem' },
								px: { sm: 1, md: 2 }
							}}>
							Contact
						</Button>

						{/* Mobile menu */}
						<IconButton
							color='inherit'
							onClick={toggleMobileMenu}
							sx={{
								display: { xs: "inline-flex", sm: "none" },
								color: "text.primary",
								p: 0.5
							}}>
							<MenuIcon />
						</IconButton>
						
						{/* Mobile menu drawer */}
						<Drawer
							anchor="right"
							open={mobileMenuOpen}
							onClose={closeMobileMenu}
							ModalProps={{
								keepMounted: true,
							}}
							sx={{
								'& .MuiDrawer-paper': {
									width: '100vw',
									maxWidth: 300,
									height: '100vh',
									boxSizing: 'border-box',
								},
							}}>
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									bgcolor: 'background.paper',
								}}>
								{/* Mobile menu header */}
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										p: 2,
										borderBottom: '1px solid',
										borderColor: 'divider',
									}}>
									<Typography variant="h6">Menu</Typography>
									<IconButton onClick={closeMobileMenu}>
										<Close />
									</IconButton>
								</Box>
								
								{/* Mobile menu items */}
								<List sx={{ flex: 1, pt: 2 }}>
									<ListItem 
										button 
										component={Link} 
										to="/about" 
										onClick={closeMobileMenu}
										sx={{ py: 1.5 }}>
										<ListItemIcon>
											<Info />
										</ListItemIcon>
										<ListItemText primary="About" />
									</ListItem>
									<ListItem 
										button 
										component={Link} 
										to="/contact" 
										onClick={closeMobileMenu}
										sx={{ py: 1.5 }}>
										<ListItemIcon>
											<ContactMail />
										</ListItemIcon>
										<ListItemText primary="Contact" />
									</ListItem>
									<Divider sx={{ my: 1 }} />
									<ListItem 
										button 
										onClick={() => { toggleMode(); closeMobileMenu(); }}
										sx={{ py: 1.5 }}>
										<ListItemIcon>
											{mode === "dark" ? <Brightness4 /> : <Brightness7 />}
										</ListItemIcon>
										<ListItemText primary={mode === "dark" ? "Light Mode" : "Dark Mode"} />
									</ListItem>
								</List>
							</Box>
						</Drawer>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;