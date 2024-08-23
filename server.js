// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');

// const app = express();

// // Connect to the database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { convert_20 } = require('./convert');
// // const File = require('./models/File'); // Import the File model

// const app = express();

// // Connect to the database
// connectDB();

// // Configure CORS to allow multiple origins and headers
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'x-auth-token'],
//     credentials: true
// }));

// app.use(express.json());

// // API to fetch filenames from MongoDB
// app.get('/api/fileNames', async (req, res) => {
//     try {
//         const files = await File.find().select('lasFilename date -_id'); // Fetch both lasFilename and date fields
//         res.json(files);
//     } catch (err) {
//         res.status(500).json({ error: 'Error fetching file names' });
//     }
// });

// // API to delete a filename from MongoDB
// app.delete('/api/fileNames/:filename', async (req, res) => {
//     const { filename } = req.params;
//     try {
//         await File.findOneAndDelete({ lasFilename: filename });
//         res.json({ success: true });
//     } catch (err) {
//         res.status(500).json({ error: 'Error deleting file' });
//     }
// });

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, 'uploads');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

//     if (potreeSupportedExtensions.includes(fileExtension)) {
//         const inputPaths = [file.path];
//         const chosenPath = 'C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds';

//         convert_20(inputPaths, chosenPath).then((lasFilename) => {
//             res.json({ lasFilename });
//         }).catch((error) => {
//             res.status(500).json({ error: error.message });
//         });
//     } else if (fileExtension === '.obj' || fileExtension === '.stl') {
//         const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/others', file.originalname);
//         fs.rename(file.path, savePath, (err) => {
//             if (err) {
//                 console.error('Error moving file:', err);
//                 return res.status(500).json({ error: 'Failed to move file' });
//             }
//             console.log('File saved successfully:', savePath);
//             res.json({ lasFilename: file.originalname });
//         });
//     } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//     }
// });

// // Preflight request handling for /savePotree
// app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data } = req.body;

//     if (!lasFilename || !data) {
//         return res.status(400).json({ error: 'lasFilename and data are required' });
//     }

//     const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds', lasFilename, 'potree.json');

//     try {
//         // Save the potree.json file regardless of whether the filename already exists
//         fs.writeFile(savePath, JSON.stringify(data, null, 2), async (err) => {
//             if (err) {
//                 console.error('Error saving file:', err);
//                 return res.status(500).json({ error: 'Failed to save file' });
//             }
//             console.log('File saved successfully:', savePath);

//             // Check if the filename already exists in the database
//             const existingFile = await File.findOne({ lasFilename });

//             if (existingFile) {
//                 // If the file already exists, just respond with success
//                 return res.json({ success: true, message: 'Filename already exists' });
//             }

//             // Save the lasFilename to the database if it does not already exist
//             try {
//                 const newFile = new File({ lasFilename });
//                 await newFile.save();
//                 res.json({ success: true });
//             } catch (err) {
//                 console.error('Error saving to the database:', err);
//                 res.status(500).json({ error: 'Failed to save to the database' });
//             }
//         });
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ error: 'Error processing request' });
//     }
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { convert_20 } = require('./convert');
// const User = require('./models/User'); // Import User model

// const app = express();

// // Connect to the database
// connectDB();

// // Configure CORS to allow multiple origins and headers
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'x-auth-token'],
//     credentials: true
// }));

// app.use(express.json());

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, 'uploads');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

//     if (potreeSupportedExtensions.includes(fileExtension)) {
//         const inputPaths = [file.path];
//         const chosenPath = 'C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds';

//         convert_20(inputPaths, chosenPath).then((lasFilename) => {
//             res.json({ lasFilename });
//         }).catch((error) => {
//             res.status(500).json({ error: error.message });
//         });
//     } else if (fileExtension === '.obj' || fileExtension === '.stl') {
//         const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/others', file.originalname);
//         fs.rename(file.path, savePath, (err) => {
//             if (err) {
//                 console.error('Error moving file:', err);
//                 return res.status(500).json({ error: 'Failed to move file' });
//             }
//             console.log('File saved successfully:', savePath);
//             res.json({ lasFilename: file.originalname });
//         });
//     } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//     }
// });

// // Preflight request handling for /savePotree
// app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data, userId } = req.body;

//     if (!lasFilename || !data || !userId) {
//         return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
//     }

//     const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds', lasFilename, 'potree.json');

//     try {
//         // Save the potree.json file regardless of whether the filename already exists
//         fs.writeFile(savePath, JSON.stringify(data, null, 2), async (err) => {
//             if (err) {
//                 console.error('Error saving file:', err);
//                 return res.status(500).json({ error: 'Failed to save file' });
//             }
//             console.log('File saved successfully:', savePath);

//             // Update the user's savedFiles array
//             try {
//                 const user = await User.findById(userId);

//                 if (!user) {
//                     return res.status(404).json({ error: 'User not found' });
//                 }

//                 if (!user.savedFiles.includes(lasFilename)) {
//                     user.savedFiles.push(lasFilename);
//                     await user.save();
//                 }

//                 res.json({ success: true });
//             } catch (err) {
//                 console.error('Error updating user:', err);
//                 res.status(500).json({ error: 'Failed to update user' });
//             }
//         });
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ error: 'Error processing request' });
//     }
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { convert_20 } = require('./convert');
// const User = require('./models/User'); // Import User model

// const app = express();

// // Connect to the database
// connectDB();

// // Configure CORS to allow multiple origins and headers
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'x-auth-token'],
//     credentials: true
// }));

// app.use(express.json());

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, 'uploads');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

//     if (potreeSupportedExtensions.includes(fileExtension)) {
//         const inputPaths = [file.path];
//         const chosenPath = 'C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds';

//         convert_20(inputPaths, chosenPath).then((lasFilename) => {
//             res.json({ lasFilename });
//         }).catch((error) => {
//             res.status(500).json({ error: error.message });
//         });
//     } else if (fileExtension === '.obj' || fileExtension === '.stl') {
//         const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/others', file.originalname);
//         fs.rename(file.path, savePath, (err) => {
//             if (err) {
//                 console.error('Error moving file:', err);
//                 return res.status(500).json({ error: 'Failed to move file' });
//             }
//             console.log('File saved successfully:', savePath);
//             res.json({ lasFilename: file.originalname });
//         });
//     } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//     }
// });

// // Preflight request handling for /savePotree
// app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data, userId } = req.body;

//     if (!lasFilename || !data || !userId) {
//         return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
//     }

//     const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds', lasFilename, 'potree.json');

//     try {
//         // Save the potree.json file regardless of whether the filename already exists
//         fs.writeFile(savePath, JSON.stringify(data, null, 2), async (err) => {
//             if (err) {
//                 console.error('Error saving file:', err);
//                 return res.status(500).json({ error: 'Failed to save file' });
//             }
//             console.log('File saved successfully:', savePath);

//             // Update the user's savedFiles array
//             try {
//                 const user = await User.findById(userId);

//                 if (!user) {
//                     return res.status(404).json({ error: 'User not found' });
//                 }

//                 if (!user.savedFiles.includes(lasFilename)) {
//                     user.savedFiles.push(lasFilename);
//                     await user.save();
//                 }

//                 res.json({ success: true });
//             } catch (err) {
//                 console.error('Error updating user:', err);
//                 res.status(500).json({ error: 'Failed to update user' });
//             }
//         });
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ error: 'Error processing request' });
//     }
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// // Route to fetch file names
// app.get('/api/fileNames', async (req, res) => {
//     try {
//         // Fetch file names from the uploads directory or database
//         const uploadPath = path.join(__dirname, 'uploads');
//         fs.readdir(uploadPath, (err, files) => {
//             if (err) {
//                 console.error('Error reading directory:', err);
//                 return res.status(500).json({ error: 'Failed to read directory' });
//             }
//             // Filter out directories or other non-file entries if needed
//             res.json(files.filter(file => fs.statSync(path.join(uploadPath, file)).isFile()));
//         });
//     } catch (error) {
//         console.error('Error fetching file names:', error);
//         res.status(500).json({ error: 'Failed to fetch file names' });
//     }
// });

//mi
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { convert_20 } = require('./convert');
// const User = require('./models/User'); // Import User model

// const app = express();

// // Connect to the database
// connectDB();

// // Configure CORS to allow multiple origins and headers
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'x-auth-token'],
//     credentials: true
// }));

// app.use(express.json());

// // Configure Multer for file uploads (without saving files to the /uploads folder)
// const storage = multer.memoryStorage(); // Store files in memory instead of disk

// const upload = multer({ storage: storage });

// // Upload route
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

//     if (potreeSupportedExtensions.includes(fileExtension)) {
//         // Save the file in the desired location
//         const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds', file.originalname);

//         fs.writeFile(savePath, file.buffer, async (err) => {
//             if (err) {
//                 console.error('Error saving file:', err);
//                 return res.status(500).json({ error: 'Failed to save file' });
//             }
//             console.log('File saved successfully:', savePath);

//             // Optionally, process the file with the convert_20 function
//             const inputPaths = [savePath];
//             const chosenPath = 'C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds';

//             try {
//                 const lasFilename = await convert_20(inputPaths, chosenPath);
//                 res.json({ lasFilename });
//             } catch (error) {
//                 res.status(500).json({ error: error.message });
//             }
//         });
//     } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//     }
// });

// // Preflight request handling for /savePotree
// app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data, userId } = req.body;

//     if (!lasFilename || !data || !userId) {
//         return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
//     }

//     const savePath = path.join('C:/Users/ghaya/OneDrive/Desktop/New folder/potree/pointclouds', lasFilename, 'potree.json');

//     try {
//         // Save the potree.json file regardless of whether the filename already exists
//         fs.writeFile(savePath, JSON.stringify(data, null, 2), async (err) => {
//             if (err) {
//                 console.error('Error saving file:', err);
//                 return res.status(500).json({ error: 'Failed to save file' });
//             }
//             console.log('File saved successfully:', savePath);

//             // Update the user's savedFiles array
//             try {
//                 const user = await User.findById(userId);

//                 if (!user) {
//                     return res.status(404).json({ error: 'User not found' });
//                 }

//                 if (!user.savedFiles.includes(lasFilename)) {
//                     user.savedFiles.push(lasFilename);
//                     await user.save();
//                 }

//                 res.json({ success: true });
//             } catch (err) {
//                 console.error('Error updating user:', err);
//                 res.status(500).json({ error: 'Failed to update user' });
//             }
//         });
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ error: 'Error processing request' });
//     }
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const os = require('os'); // To use the system's temp directory
// const { convert_20 } = require('./convert');
// const User = require('./models/User');
// require('dotenv').config();

// const app = express();

// // Connect to the database
// connectDB();

// // Configure CORS
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'x-auth-token'],
//     credentials: true
// }));

// app.use(express.json());

// // Configure Multer for file uploads (storing files in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Configure AWS SDK v3 with environment variables
// const s3Client = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         sessionToken: process.env.AWS_SESSION_TOKEN // If using temporary credentials
//     }
// });

// // Upload route
// app.post('/upload', upload.single('file'), async (req, res) => {
//     const file = req.file;
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     if (potreeSupportedExtensions.includes(fileExtension)) {
//         const tempDir = os.tmpdir();
//         const tempFilePath = path.join(tempDir, file.originalname);

//         // Save the file temporarily
//         fs.writeFile(tempFilePath, file.buffer, async (err) => {
//             if (err) {
//                 console.error('Error saving file temporarily:', err);
//                 return res.status(500).json({ error: 'Failed to save file temporarily' });
//             }

//             console.log('File saved temporarily:', tempFilePath);

//             // Process the file with the convert_20 function
//             const inputPaths = [tempFilePath];
//             const chosenPath = tempDir;

//             try {
//                 const lasFilename = await convert_20(inputPaths, chosenPath);
//                 const convertedFiles = fs.readdirSync(path.join(tempDir, lasFilename));

//                 // Upload each converted file to S3
//                 for (const file of convertedFiles) {
//                     const filePath = path.join(tempDir, lasFilename, file);
//                     const fileBuffer = fs.readFileSync(filePath);
//                     const key = `pointclouds/${lasFilename}/${file}`;

//                     const params = {
//                         Bucket: 'potree-development-2024',
//                         Key: key,
//                         Body: fileBuffer,
//                         ContentType: 'application/octet-stream'
//                     };

//                     await s3Client.send(new PutObjectCommand(params));
//                     console.log('File uploaded successfully:', key);
//                 }

//                 // Respond with the lasFilename or other relevant data
//                 res.json({ lasFilename });
//             } catch (error) {
//                 console.error('Error during conversion or S3 upload:', error);
//                 res.status(500).json({ error: error.message });
//             } finally {
//                 // Clean up the temporary files
//                 fs.rmSync(path.join(tempDir, lasFilename), { recursive: true, force: true });
//             }
//         });
//     } else {
//         res.status(400).json({ error: 'Unsupported file format' });
//     }
// });

// // Preflight request handling for /savePotree
// app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data, userId } = req.body;

//     if (!lasFilename || !data || !userId) {
//         return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
//     }

//     const key = `pointclouds/${lasFilename}/potree.json`;

//     const params = {
//         Bucket: 'potree-development-2024',
//         Key: key,
//         Body: JSON.stringify(data, null, 2),
//         ContentType: 'application/json'
//     };

//     try {
//         await s3Client.send(new PutObjectCommand(params));
//         console.log('potree.json uploaded successfully:', key);

//         // Update the user's savedFiles array
//         try {
//             const user = await User.findById(userId);

//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             if (!user.savedFiles.includes(lasFilename)) {
//                 user.savedFiles.push(lasFilename);
//                 await user.save();
//             }

//             res.json({ success: true });
//         } catch (err) {
//             console.error('Error updating user:', err);
//             res.status(500).json({ error: 'Failed to update user' });
//         }
//     } catch (err) {
//         console.error('Error uploading potree.json:', err);
//         res.status(500).json({ error: 'Failed to upload potree.json' });
//     }
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os'); // To use the system's temp directory
const { convert_20 } = require('./convert');
const User = require('./models/User');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Configure CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:1234'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    credentials: true
}));

app.use(express.json());

// Configure Multer for file uploads (storing files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure AWS SDK v3 with environment variables
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        // sessionToken: process.env.AWS_SESSION_TOKEN // If using temporary credentials
    }
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const potreeSupportedExtensions = ['.laz', '.las', '.xyz', '.pts', '.e57', '.ply', '.bin'];

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (potreeSupportedExtensions.includes(fileExtension)) {
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, file.originalname);

        // Save the file temporarily
        fs.writeFile(tempFilePath, file.buffer, async (err) => {
            if (err) {
                console.error('Error saving file temporarily:', err);
                return res.status(500).json({ error: 'Failed to save file temporarily' });
            }

            console.log('File saved temporarily:', tempFilePath);

            // Process the file with the convert_20 function
            const inputPaths = [tempFilePath];
            const chosenPath = tempDir;

            try {
                const lasFilename = await convert_20(inputPaths, chosenPath);
                const convertedFiles = fs.readdirSync(path.join(tempDir, lasFilename));

                // Upload each converted file to S3
                for (const file of convertedFiles) {
                    const filePath = path.join(tempDir, lasFilename, file);
                    const fileBuffer = fs.readFileSync(filePath);
                    const key = `pointclouds/${lasFilename}/${file}`;

                    const params = {
                        Bucket: 'potree-development-2024',
                        Key: key,
                        Body: fileBuffer,
                        ContentType: 'application/octet-stream'
                    };

                    await s3Client.send(new PutObjectCommand(params));
                    console.log('File uploaded successfully:', key);
                }

                // Respond with the lasFilename or other relevant data
                res.json({ lasFilename });

                // Clean up the temporary files
                fs.rmSync(path.join(tempDir, lasFilename), { recursive: true, force: true });

            } catch (error) {
                console.error('Error during conversion or S3 upload:', error);
                res.status(500).json({ error: error.message });
            }
        });
    } else {
        res.status(400).json({ error: 'Unsupported file format' });
    }
});

// Preflight request handling for /savePotree
app.options('/savePotree', cors());

// app.post('/savePotree', express.json(), async (req, res) => {
//     const { lasFilename, data, userId } = req.body;

//     if (!lasFilename || !data || !userId) {
//         return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
//     }

//     const key = `pointclouds/${lasFilename}/potree.json`;

//     const params = {
//         Bucket: 'potree-development-2024',
//         Key: key,
//         Body: JSON.stringify(data, null, 2),
//         ContentType: 'application/json'
//     };

//     try {
//         await s3Client.send(new PutObjectCommand(params));
//         console.log('potree.json uploaded successfully:', key);

//         // Update the user's savedFiles array
//         try {
//             const user = await User.findById(userId);

//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             if (!user.savedFiles.includes(lasFilename)) {
//                 user.savedFiles.push(lasFilename);
//                 await user.save();
//             }

//             res.json({ success: true });
//         } catch (err) {
//             console.error('Error updating user:', err);
//             res.status(500).json({ error: 'Failed to update user' });
//         }
//     } catch (err) {
//         console.error('Error uploading potree.json:', err);
//         res.status(500).json({ error: 'Failed to upload potree.json' });
//     }
// });

app.post('/savePotree', express.json(), async (req, res) => {
    const { lasFilename, data, userId } = req.body;

    if (!lasFilename || !data || !userId) {
        return res.status(400).json({ error: 'lasFilename, data, and userId are required' });
    }

    const key = `pointclouds/${lasFilename}/potree.json`;

    const params = {
        Bucket: 'potree-development-2024',
        Key: key,
        Body: JSON.stringify(data, null, 2),
        ContentType: 'application/json'
    };

    try {
        // Upload the potree.json file to S3
        await s3Client.send(new PutObjectCommand(params));
        console.log('potree.json uploaded successfully:', key);

        // Update the user's savedFiles array in MongoDB
        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Add the lasFilename to the user's savedFiles if it doesn't exist
            if (!user.savedFiles.includes(lasFilename)) {
                user.savedFiles.push(lasFilename);
                await user.save();
            }

            // Respond with success
            res.json({ success: true });
        } catch (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Failed to update user' });
        }
    } catch (err) {
        console.error('Error uploading potree.json:', err);
        res.status(500).json({ error: 'Failed to upload potree.json' });
    }
});


// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
