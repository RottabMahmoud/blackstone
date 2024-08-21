var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// The Debounce function
function makeDebounce(fn, delay) {
    var timer;
    return function (input) {
        if (timer)
            clearTimeout(timer);
        timer = window.setTimeout(function () { return fn(input); }, delay);
    };
}
// Fetch locations from OpenStreetMap API
function fetchLocations(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!query)
                        return [2 /*return*/, []];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(query)))];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    // Validate the API response
                    if (Array.isArray(data) && data.every(isLocation)) {
                        return [2 /*return*/, data];
                    }
                    else {
                        throw new Error("Invalid API response");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Fetch error:", error_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Type guard for Location
function isLocation(data) {
    return (typeof data === "object" &&
        data !== null &&
        typeof data.place_id === "number" &&
        typeof data.licence === "string" &&
        typeof data.osm_type === "string" &&
        typeof data.osm_id === "number" &&
        typeof data.lat === "string" &&
        typeof data.lon === "string" &&
        typeof data.class === "string" &&
        typeof data.type === "string" &&
        typeof data.place_rank === "number" &&
        typeof data.importance === "number" &&
        typeof data.addresstype === "string" &&
        typeof data.name === "string" &&
        typeof data.display_name === "string" &&
        Array.isArray(data.boundingbox) &&
        data.boundingbox.length === 4 &&
        data.boundingbox.every(function (box) { return typeof box === "string"; }));
}
// To Render results in the DOM
function renderResults(results) {
    var resultsContainer = document.getElementById("results");
    if (!resultsContainer)
        return;
    resultsContainer.innerHTML = results
        .map(function (result) { return "<div class=\"result-item\">".concat(result.display_name, "</div>"); })
        .join("");
}
// Debounced search function
var debouncedSearch = makeDebounce(function (input) { return __awaiter(_this, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchLocations(input)];
            case 1:
                results = _a.sent();
                renderResults(results);
                return [2 /*return*/];
        }
    });
}); }, 1000);
// Added event listener to input field
var searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function (event) {
        var target = event.target;
        debouncedSearch(target.value);
    });
}
