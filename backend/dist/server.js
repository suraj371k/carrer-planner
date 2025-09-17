"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./utils/db"));
// Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const jobs_routes_1 = __importDefault(require("./routes/jobs.routes"));
const interview_routes_1 = __importDefault(require("./routes/interview.routes"));
const resume_routes_1 = __importDefault(require("./routes/resume.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Trust Render/Proxy so Secure cookies are set correctly
app.set("trust proxy", 1);
app.use(express_1.default.json());
// CORS configuration
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // allow non-browser or same-origin
        if (allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello from Express + TypeScript!");
});
//routes
app.use("/api/users", user_routes_1.default);
app.use("/api/career", career_routes_1.default);
app.use("/api/jobs", jobs_routes_1.default);
app.use("/api/interview", interview_routes_1.default);
app.use("/api/resume", resume_routes_1.default);
// Connect to MongoDB
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map