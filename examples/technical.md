# Example: Technical

**Author:** Dhruva Patar  
**Repository:** prompt-token-optimization-framework  
**Pipeline version:** v0.1.0

---

## Example 1 — Implementation how-to

**Raw input:**
```
How do I implement JWT authentication in a Node.js Express app?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 14 tokens → proceed |
| Classification | "how do I", "implement" → **Technical** (confidence: 0.97) |
| Complexity flag | Single signal → `flag_complex = FALSE` |
| Strip | Removed: "How do I" |
| Logic gate | Skipped |
| Format | Numbered steps, no elaboration unless asked |

**Pipeline output:**
```
COMPRESSED PROMPT: Implement JWT authentication in Node.js Express — steps?
TYPE: Technical
```

**Sample response (formatted output):**

1. Install dependencies: `npm install jsonwebtoken bcryptjs`
2. Create a `/register` route — hash password with bcrypt, save user to DB
3. Create a `/login` route — verify credentials, sign a JWT with `jwt.sign(payload, secret, { expiresIn: '1h' })`
4. Return the token in the response body
5. Write a middleware function that reads `Authorization: Bearer <token>` from headers
6. Verify token in middleware using `jwt.verify(token, secret)`
7. Attach decoded payload to `req.user` and call `next()`
8. Apply middleware to any protected routes: `router.get('/profile', authMiddleware, handler)`

---

## Example 2 — Debugging / fix steps

**Raw input:**
```
My Python script keeps throwing a RecursionError — how do I fix it and prevent it in future?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 18 tokens → proceed |
| Classification | "how do I fix", "prevent" → **Technical** (confidence: 0.94) |
| Strip | Removed: "My Python script keeps throwing" → replaced with concise form |
| Format | Numbered steps, no elaboration |

**Pipeline output:**
```
COMPRESSED PROMPT: Fix and prevent RecursionError in Python?
TYPE: Technical
```

**Sample response (formatted output):**

1. Identify the recursive function — add a print statement to trace call depth
2. Check for a missing or unreachable base case — every recursive function needs one
3. Verify the recursive call is moving toward the base case with each call
4. Check for circular references if recursion is data-driven (e.g. tree traversal)
5. Increase recursion limit temporarily with `sys.setrecursionlimit(n)` — diagnostic only, not a fix
6. Refactor deep recursion to iteration using an explicit stack (`collections.deque`)
7. Use `@functools.lru_cache` or memoisation to prevent redundant recursive calls
8. For tree/graph traversal, prefer iterative BFS/DFS to avoid stack overflow at scale

---

## Example 3 — Setup / configuration

**Raw input:**
```
What are the steps to set up a Python virtual environment and install packages from a requirements file?
```

**Pipeline execution:**

| Stage | Result |
|-------|--------|
| Token check | 20 tokens → proceed |
| Classification | "steps to set up", "install" → **Technical** (confidence: 0.96) |
| Strip | Removed: "What are the" |
| Format | Numbered steps |

**Pipeline output:**
```
COMPRESSED PROMPT: Set up Python virtual environment and install from requirements.txt — steps?
TYPE: Technical
```

**Sample response (formatted output):**

1. Navigate to project directory: `cd your-project`
2. Create virtual environment: `python -m venv venv`
3. Activate (macOS/Linux): `source venv/bin/activate`
4. Activate (Windows): `venv\Scripts\activate`
5. Confirm activation — prompt shows `(venv)` prefix
6. Upgrade pip: `pip install --upgrade pip`
7. Install from requirements file: `pip install -r requirements.txt`
8. Verify installations: `pip list`
9. Deactivate when done: `deactivate`
10. Add `venv/` to `.gitignore` — never commit the environment folder
