from pathlib import Path

# Fix app/api/results/route.ts
results_path = Path("app/api/results/route.ts")

results_text = results_path.read_text(encoding="utf-8")

results_text = results_text.replace(
    'import { prisma } from "../../lib/prisma";',
    'import { prisma } from "@/lib/prisma";'
)

results_path.write_text(results_text, encoding="utf-8")


# Fix app/api/live-feed/route.ts
live_feed_path = Path("app/api/live-feed/route.ts")

live_feed_text = live_feed_path.read_text(encoding="utf-8")

live_feed_text = live_feed_text.replace(
    'import { prisma } from "../../lib/prisma";',
    'import { prisma } from "@/lib/prisma";'
)

live_feed_path.write_text(live_feed_text, encoding="utf-8")

# Fix app/api/check-vote/route.ts
check_vote_path = Path("app/api/check-vote/route.ts")

check_vote_text = check_vote_path.read_text(encoding="utf-8")

check_vote_text = check_vote_text.replace(
    'import { prisma } from "../../lib/prisma";',
    'import { prisma } from "@/lib/prisma";'
)

check_vote_path.write_text(check_vote_text, encoding="utf-8")

print("Imports fixed successfully.")