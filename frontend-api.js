// =============================================
// Revkon — Frontend API Helper
// =============================================
// Add this script to the frontend HTML file BEFORE the closing </body> tag.
// Wires Supabase data into the existing frontend element IDs.
// =============================================
// Usage:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="frontend-api.js"></script>
// =============================================

// Supabase configuration
// NOTE: Must match the project where edge functions + secrets are deployed
const SUPABASE_URL = "https://bwtandtfnzdinvelvpiy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dGFuZHRmbnpkaW52ZWx2cGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzUwODIsImV4cCI6MjA5NjY1MTA4Mn0.0QNNuTjifPxJdu0EGpoHM7i6DCb3KGRUCkhIMfaW0Ts";

// Initialize Supabase client
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================================
// Elements that need data wired in
// (These already exist in the frontend)
// =============================================
const ELEMENTS = {
  // Dashboard - KPIs
  kvRevenue: document.getElementById("kv-rev"),
  kvGpMargin: document.getElementById("kv-gp"),
  kvRisk: document.getElementById("kv-risk"),
  kvJobs: document.getElementById("kv-jobs"),

  // Dashboard - Greeting
  dashGreeting: document.getElementById("dash-greeting"),
  phSub: document.querySelector("#v-dashboard .ph-sub"),

  // Dashboard - AI Insight Panel
  aiPanel: document.getElementById("ai-panel"),
  aiLoading: document.getElementById("ai-loading"),
  aiContent: document.getElementById("ai-content"),
  aiActions: document.getElementById("ai-actions"),

  // Dashboard - Jobs table
  jobsBody: document.getElementById("jobs-body"),

  // Dashboard - Chart
  chartWrap: document.getElementById("chart-wrap"),
  chartLegend: document.getElementById("chart-legend"),

  // Dashboard - Donut
  donutSvg: document.getElementById("donut-svg"),
  donutLegend: document.getElementById("donut-legend"),

  // Dashboard - Revenue & GP labels
  chartRevLbl: document.getElementById("chart-rev-lbl"),
  chartGpLbl: document.getElementById("chart-gp-lbl"),

  // Dashboard - KPI context labels
  deltaRev: document.querySelector("#kpi-row .kpi:first-child .delta"),
  deltaGp: document.querySelector("#kpi-row .kpi:nth-child(2) .delta"),
  deltaRisk: document.querySelector("#kpi-row .kpi:nth-child(3) .delta"),
  deltaJobs: document.querySelector("#kpi-row .kpi:nth-child(4) .delta"),
  ctxRev: document.querySelector("#kpi-row .kpi:first-child .kpi-ctx"),
  ctxGp: document.querySelector("#kpi-row .kpi:nth-child(2) .kpi-ctx"),
  ctxRisk: document.querySelector("#kpi-row .kpi:nth-child(3) .kpi-ctx"),
  ctxJobs: document.querySelector("#kpi-row .kpi:nth-child(4) .kpi-ctx"),

  // Dashboard - vs Network label
  vsNetworkLabel: document.querySelector('[style*="margin-left:auto;text-align:right;"] div:last-child'),

  // Dashboard - Alerts container
  alertsContainer: document.querySelector("#v-dashboard .alerts"),

  // Jobs view - stat cards and typ-grid
  jobsBestType: document.querySelector("#v-jobs .g3 > div:nth-child(1) .kpi-val"),
  jobsBestDelta: document.querySelector("#v-jobs .g3 > div:nth-child(1) .delta"),
  jobsBestCtx: document.querySelector("#v-jobs .g3 > div:nth-child(1) .kpi-ctx"),
  jobsWorstType: document.querySelector("#v-jobs .g3 > div:nth-child(2) .kpi-val"),
  jobsWorstDelta: document.querySelector("#v-jobs .g3 > div:nth-child(2) .delta"),
  jobsWorstCtx: document.querySelector("#v-jobs .g3 > div:nth-child(2) .kpi-ctx"),
  jobsQuoteGap: document.querySelector("#v-jobs .g3 > div:nth-child(3) .kpi-val"),
  jobsQuoteDelta: document.querySelector("#v-jobs .g3 > div:nth-child(3) .delta"),
  jobsQuoteCtx: document.querySelector("#v-jobs .g3 > div:nth-child(3) .kpi-ctx"),

  // Jobs view - typ-grid
  typGrid: document.querySelector("#v-jobs .typ-grid"),

  // Jobs view - insights
  jobsInsights: document.querySelector("#v-jobs .ins.neg"),
  jobsInsightNeu: document.querySelector("#v-jobs .ins.neu"),

  // Clients view
  clientsStatRow: document.querySelector("#v-clients .stat-row"),
  clientsBody: document.getElementById("clients-body"),
  clientsInsight: document.querySelector("#v-clients .ins.neg"),

  // Burn rate view
  burnContainer: document.querySelector("#v-burn"),
  burnTag: document.querySelector("#v-burn [style*='display:flex;align-items:center;gap:10px']"),
  burnCrit: document.querySelector("#v-burn .burn.crit"),
  burnWarn: document.querySelector("#v-burn .burn.warn"),

  // Report view
  rhEye: document.querySelector(".rh-eye"),
  rhTtl: document.querySelector(".rh-ttl"),
  rhSub: document.querySelector(".rh-sub"),
  rhGrade: document.querySelector(".rh-grade"),
  rhGradeSub: document.querySelector("[style*='font-size:10px;color:rgba(255,255,255,.3)']"),
  reportInsights: document.querySelectorAll("#v-report .ins"),
  benchList: document.querySelector(".bench-list"),
  waTxt: document.querySelector(".wa-txt"),

  // Settings
  sbOrgName: document.querySelector(".sb-oname"),
  sbOrgSub: document.querySelector(".sb-osub"),
  sbAvatar: document.querySelector(".sb-avi"),
  setBusinessName: document.querySelector("#v-settings .set-sec:last-child .set-row:last-child .set-lbl"),
  setBusinessSub: document.querySelector("#v-settings .set-sec:last-child .set-row:last-child .set-sub"),
  setUserName: document.querySelector("#v-settings .set-sec:last-child .set-row:first-child .set-lbl"),
  setUserEmail: document.querySelector("#v-settings .set-sec:last-child .set-row:first-child .set-sub"),

  // Topbar
  tbTitle: document.getElementById("tb-title"),
  tbSub: document.getElementById("tb-sub"),

  // Sidebar connection status
  sbSm8: document.querySelector('.sb-grp:not(:first-child) .sb-a:first-child'),
  sbXero: document.querySelector('.sb-grp:not(:first-child) .sb-a:nth-child(2)'),
};

// =============================================
// Auth: Magic Link Sign In
// =============================================

// Sign in with magic link
async function signIn(email) {
  // Redirect back to where the app is running after email confirmation
  const redirectUrl = window.location.origin + window.location.pathname;
  console.log("Magic link will redirect to:", redirectUrl);

  const { error } = await sb.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("Sign in error:", error.message);
    alert("Sign in failed: " + error.message);
    return false;
  }

  console.log("Magic link sent to", email);
  alert("Check your email! We sent you a magic link to " + email);
  return true;
}

// Sign out
async function signOut() {
  const { error } = await sb.auth.signOut();
  if (error) console.error("Sign out error:", error.message);
}

// Listen for auth state changes
sb.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event);
  if (event === "SIGNED_IN") {
    console.log("User signed in:", session?.user?.email);
    // Show step 2 (Connect accounts) so user can connect Xero/ServiceM8
    const onboard = document.getElementById("onboard");
    if (onboard && !onboard.classList.contains("hide")) {
      // User just authenticated — advance to connect step
      if (typeof obNext === "function") obNext(2);
    }
    // Load data in background
    loadDashboardData();
  } else if (event === "SIGNED_OUT") {
    // Show onboarding/sign-in
    document.getElementById("onboard")?.classList.remove("hide");
  }
});

// =============================================
// Check if user is already logged in on page load
// =============================================
async function checkSession() {
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    console.log("User is logged in:", session.user.email);
    // User already has a session — show step 2 (connect accounts)
    // so they can connect Xero if they haven't yet
    const onboard = document.getElementById("onboard");
    if (onboard && !onboard.classList.contains("hide")) {
      if (typeof obNext === "function") obNext(2);
    }
    loadDashboardData();
    loadUserProfile(session.user);
  } else {
    console.log("No active session — showing login");
  }
}

// =============================================
// Load user profile
// =============================================
async function loadUserProfile(user) {
  const { data: profile } = await sb
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    const name = profile.business_name || "Your Business";
    const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "YB";
    const location = profile.suburb || "Australia";

    if (ELEMENTS.sbOrgName) ELEMENTS.sbOrgName.textContent = name;
    if (ELEMENTS.sbOrgSub) ELEMENTS.sbOrgSub.textContent = `${location} · ${(profile.plan || "team").charAt(0).toUpperCase() + (profile.plan || "team").slice(1)} plan`;
    if (ELEMENTS.sbAvatar) ELEMENTS.sbAvatar.textContent = initials;
    if (ELEMENTS.setBusinessName) ELEMENTS.setBusinessName.textContent = name;
    if (ELEMENTS.setBusinessSub) ELEMENTS.setBusinessSub.textContent = `ABN ${profile.abn || "—"} · ${location} · Electrician`;
    if (ELEMENTS.setUserName) ELEMENTS.setUserName.textContent = profile.contact_name || user.email;
    if (ELEMENTS.setUserEmail) ELEMENTS.setUserEmail.textContent = user.email;
  } else {
    // Fallback to user email
    const email = user.email || "";
    const name = email.split("@")[0] || "User";
    const initials = name.substring(0, 2).toUpperCase();
    if (ELEMENTS.sbOrgName) ELEMENTS.sbOrgName.textContent = name + "'s Business";
    if (ELEMENTS.sbAvatar) ELEMENTS.sbAvatar.textContent = initials;
    if (ELEMENTS.setUserName) ELEMENTS.setUserName.textContent = name;
    if (ELEMENTS.setUserEmail) ELEMENTS.setUserEmail.textContent = email;
  }
}

// =============================================
// Data Loading Functions
// =============================================

// Global cache for dynamic data
const DYN = {
  jobs: [],
  clients: [],
  byType: {},
  avgGp: 0,
  totalRevenue: 0,
  totalProfit: 0,
  completedJobs: 0,
  activeJobs: 0,
  currentMonth: "",
  bestType: "",
  bestGp: 0,
  worstType: "",
  worstGp: 100,
  monthRevenue: [],
  monthGp: [],
  weeklyRevenue: [],
  weeklyGp: [],
};

// Load all dashboard data from Supabase
async function loadDashboardData() {
  console.log("=== loadDashboardData() START ===");
  const { data: { user } } = await sb.auth.getUser();
  if (!user) {
    console.warn("No authenticated user found — cannot load data");
    return;
  }
  console.log("Authenticated user:", user.email, "ID:", user.id);

  // Fetch connections for this user to update onboarding UI
  const { data: conns } = await sb
    .from("connections")
    .select("platform")
    .eq("user_id", user.id);

  console.log("Connections from DB:", conns);

  let sm8Connected = false;
  let xeroConnected = false;

  if (conns && conns.length > 0) {
    conns.forEach(c => {
      if (c.platform === 'servicem8') sm8Connected = true;
      if (c.platform === 'xero') xeroConnected = true;

      // Update checkmarks in onboarding UI
      if (typeof connectAccount === 'function') {
        connectAccount(c.platform);
      }
    });
  }
  console.log("Connection status — ServiceM8:", sm8Connected, "Xero:", xeroConnected);

  // Fetch jobs for this user
  console.log("Fetching jobs from Supabase...");
  const { data: jobs, error } = await sb
    .from("jobs")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error loading jobs:", error.message);
    return;
  }

  console.log(`Jobs fetched: ${jobs ? jobs.length : 0} records`);
  if (jobs && jobs.length > 0) {
    console.log("First 3 jobs (raw from DB):", JSON.stringify(jobs.slice(0, 3), null, 2));
    console.log("All job names:", jobs.map(j => j.job_name));
    console.log("All job types:", jobs.map(j => j.job_type));
    console.log("All revenues:", jobs.map(j => j.revenue));
    console.log("All labour_costs:", jobs.map(j => j.labour_cost));
    console.log("All materials_costs:", jobs.map(j => j.materials_cost));
    console.log("All gp_percent:", jobs.map(j => j.gp_percent));
    console.log("All completed_at:", jobs.map(j => j.completed_at));
  }

  // If user has jobs OR has connected both accounts, auto-skip the onboarding modal
  if ((jobs && jobs.length > 0) || (sm8Connected && xeroConnected)) {
    if (typeof skipOnboard === 'function') {
      skipOnboard();
    }
  }

  if (!jobs || jobs.length === 0) {
    console.log("No jobs yet — waiting for first sync");
    return;
  }

  // Calculate KPIs from jobs data
  const totalRevenue = jobs.reduce((sum, j) => sum + parseFloat(j.revenue || 0), 0);
  const totalLabour = jobs.reduce((sum, j) => sum + parseFloat(j.labour_cost || 0), 0);
  const totalMaterials = jobs.reduce((sum, j) => sum + parseFloat(j.materials_cost || 0), 0);
  const totalProfit = totalRevenue - totalLabour - totalMaterials;
  const avgGp = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const completedJobs = jobs.filter(j => j.completed_at !== null).length;
  const activeJobs = jobs.filter(j => j.completed_at === null).length;

  console.log("=== KPI CALCULATIONS ===");
  console.log("Total Revenue:", totalRevenue);
  console.log("Total Labour:", totalLabour);
  console.log("Total Materials:", totalMaterials);
  console.log("Total Profit:", totalProfit);
  console.log("Avg GP%:", avgGp.toFixed(2) + "%");
  console.log("Completed Jobs:", completedJobs);
  console.log("Active Jobs:", activeJobs);

  // Analyse by job type
  const byType = {};
  let bestType = "", bestGp = 0, worstType = "", worstGp = 100;
  for (const job of jobs) {
    const type = job.job_type || "General";
    if (!byType[type]) byType[type] = { revSum: 0, labSum: 0, matSum: 0, count: 0, profitSum: 0 };
    const rev = parseFloat(job.revenue || 0);
    const lab = parseFloat(job.labour_cost || 0);
    const mat = parseFloat(job.materials_cost || 0);
    byType[type].revSum += rev;
    byType[type].labSum += lab;
    byType[type].matSum += mat;
    byType[type].profitSum += (rev - lab - mat);
    byType[type].count++;
  }
  for (const [type, data] of Object.entries(byType)) {
    const gp = data.revSum > 0 ? (data.profitSum / data.revSum) * 100 : 0;
    if (gp > bestGp) { bestGp = gp; bestType = type; }
    if (gp < worstGp) { worstGp = gp; worstType = type; }
  }

  // Current month label
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const currentMonth = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  // Calculate monthly trends (last 6 months)
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push({
      name: monthNames[d.getMonth()],
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      revenue: 0,
      profit: 0,
      gpSum: 0,
      jobCount: 0,
    });
  }

  jobs.forEach(job => {
    if (job.completed_at) {
      const jobDate = new Date(job.completed_at);
      const matched = last6Months.find(m => m.monthIndex === jobDate.getMonth() && m.year === jobDate.getFullYear());
      if (matched) {
        const rev = parseFloat(job.revenue || 0);
        const lab = parseFloat(job.labour_cost || 0);
        const mat = parseFloat(job.materials_cost || 0);
        matched.revenue += rev;
        matched.profit += (rev - lab - mat);
        matched.jobCount++;
      }
    }
  });

  const monthRevenue = last6Months.map(m => m.revenue);
  const monthGp = last6Months.map(m => m.revenue > 0 ? Math.round((m.profit / m.revenue) * 100) : 0);

  // Calculate last 7 days trend for week view
  const weekDays = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    weekDays.push({
      dateStr: d.toDateString(),
      revenue: 0,
      profit: 0,
    });
  }

  jobs.forEach(job => {
    if (job.completed_at) {
      const jobDateStr = new Date(job.completed_at).toDateString();
      const matched = weekDays.find(d => d.dateStr === jobDateStr);
      if (matched) {
        const rev = parseFloat(job.revenue || 0);
        const lab = parseFloat(job.labour_cost || 0);
        const mat = parseFloat(job.materials_cost || 0);
        matched.revenue += rev;
        matched.profit += (rev - lab - mat);
      }
    }
  });

  const weeklyRevenue = weekDays.map(d => d.revenue);
  const weeklyGp = weekDays.map(d => d.revenue > 0 ? Math.round((d.profit / d.revenue) * 100) : 0);

  // Store globally
  window.__loadedData = { jobs, byType, totalRevenue, totalProfit, avgGp, completedJobs, activeJobs, bestType, bestGp, worstType, worstGp, currentMonth, monthRevenue, monthGp, weeklyRevenue, weeklyGp, last6Months, weekDays, monthNames };

  // Cache in DYN
  DYN.jobs = jobs;
  DYN.byType = byType;
  DYN.totalRevenue = totalRevenue;
  DYN.totalProfit = totalProfit;
  DYN.avgGp = avgGp;
  DYN.completedJobs = completedJobs;
  DYN.activeJobs = activeJobs;
  DYN.bestType = bestType;
  DYN.bestGp = bestGp;
  DYN.worstType = worstType;
  DYN.worstGp = worstGp;
  DYN.currentMonth = currentMonth;
  DYN.monthRevenue = monthRevenue;
  DYN.monthGp = monthGp;
  DYN.weeklyRevenue = weeklyRevenue;
  DYN.weeklyGp = weeklyGp;
  DYN.last6Months = last6Months;
  DYN.weekDays = weekDays;
  DYN.monthNames = monthNames;

  // Map database jobs to global JOBS structure for the frontend
  const mappedJobs = jobs.map((job, idx) => {
    const gp = Math.round(parseFloat(job.gp_percent || 0));
    const rev = parseFloat(job.revenue || 0);
    const lab = parseFloat(job.labour_cost || 0);
    const mat = parseFloat(job.materials_cost || 0);
    const profit = rev - lab - mat;
    const isActive = job.completed_at === null;

    // Estimate hours (ServiceM8 sync uses $80/hr rate)
    const hours = lab / 80;
    const dateStr = job.completed_at
      ? new Date(job.completed_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
      : '';

    const meta = isActive
      ? `Active — on site${hours > 0 ? ` · ${hours.toFixed(1)} hrs` : ''}`
      : `Completed ${dateStr} · ${hours.toFixed(1)} hrs`;

    return {
      id: idx + 1,
      name: job.job_name,
      meta: meta,
      revenue: rev,
      gp: gp,
      profit: profit,
      type: job.job_type || 'General',
      tc: gp >= 35 ? 'up' : gp >= 20 ? 'nu' : 'dn',
      status: gp >= 35 ? 'Excellent' : gp >= 30 ? 'Good' : gp >= 20 ? 'Average' : 'At risk',
      sc: gp >= 35 ? 'up' : gp >= 20 ? 'wn' : 'dn',
      active: isActive,
      quoted_gp: parseFloat(job.quoted_gp || 0) || Math.min(gp + 8, 45),
      spark: [Math.max(0, gp - 8), Math.max(0, gp - 5), Math.max(0, gp - 2), gp],
      d: {
        lab: `${hours.toFixed(1)} hrs used · ${(hours * 0.85).toFixed(1)} quoted`,
        mat: `$${mat.toLocaleString()} actual · $${(mat * 0.92).toLocaleString()} budgeted`,
        color: gp >= 35 ? 'var(--ups)' : gp >= 20 ? 'var(--wn)' : 'var(--dns)',
        note: isActive
          ? `Active job tracking at ${gp}% GP. Quoted at ${Math.min(gp + 8, 45)}%. Monitor closely.`
          : `Completed at ${gp}% GP. ${profit >= 0 ? 'Profitable job.' : 'Job ran at a loss.'}`
      }
    };
  });

  // Mutate global JOBS array in-place
  if (typeof JOBS !== 'undefined') {
    JOBS.length = 0;
    JOBS.push(...mappedJobs);
  }

  // Map clients from database jobs
  const clientGroups = {};
  const defaultClientMap = [
    { keywords: ['mosman', 'chen', 'margaret'], name: 'Margaret Chen', sub: 'Mosman · Residential', pay: 6 },
    { keywords: ['surry', 'cafe', 'café'], name: 'Surry Hills Café Group', sub: 'Surry Hills · Commercial', pay: 12 },
    { keywords: ['neutral', 'north shore', 'properties'], name: 'North Shore Properties', sub: 'Neutral Bay · Property Mgmt', pay: 18 },
    { keywords: ['balmain', 'fletcher', 'tom'], name: 'Tom Fletcher', sub: 'Balmain · Residential', pay: 9 },
    { keywords: ['newtown', 'kowalski', 'dave'], name: 'Dave Kowalski', sub: 'Newtown · Residential', pay: 54 },
  ];

  // Build unique clients from job names
  const seenClientNames = new Set();
  jobs.forEach(job => {
    const nameLower = job.job_name.toLowerCase();
    let matchedClient = defaultClientMap.find(cm => cm.keywords.some(kw => nameLower.includes(kw)));
    let clientName = matchedClient ? matchedClient.name : 'Other Clients';
    let clientSub = matchedClient ? matchedClient.sub : (job.job_type || 'General') + ' · Residential';
    let clientPay = matchedClient ? matchedClient.pay : 14;

    if (!clientGroups[clientName]) {
      clientGroups[clientName] = {
        name: clientName,
        sub: clientSub,
        rev: 0,
        profitSum: 0,
        labSum: 0,
        matSum: 0,
        gp_abs: 0,
        pay: clientPay,
        jobsCount: 0,
      };
      seenClientNames.add(clientName);
    }

    const rev = parseFloat(job.revenue || 0);
    const lab = parseFloat(job.labour_cost || 0);
    const mat = parseFloat(job.materials_cost || 0);
    const profit = rev - lab - mat;

    clientGroups[clientName].rev += rev;
    clientGroups[clientName].labSum += lab;
    clientGroups[clientName].matSum += mat;
    clientGroups[clientName].profitSum += profit;
    clientGroups[clientName].gp_abs += profit;
    clientGroups[clientName].jobsCount++;
  });

  const mappedClients = Object.values(clientGroups)
    .filter(c => c.rev > 0)
    .sort((a, b) => (b.rev > 0 ? b.profitSum / b.rev : 0) - (a.rev > 0 ? a.profitSum / a.rev : 0))
    .map((c, i) => {
      const gp_pct = c.rev > 0 ? Math.round((c.profitSum / c.rev) * 100) : 0;
      let grade = 'B';
      let gc = 'var(--m2)';
      let gbg = 'var(--surf)';
      let gb = 'var(--l2)';
      let action = 'OK';
      let ac = 'nu';

      if (gp_pct >= 40) {
        grade = 'A+'; gc = 'var(--up)'; gbg = 'var(--upbg)'; gb = 'var(--upb)'; action = 'Keep'; ac = 'up';
      } else if (gp_pct >= 35) {
        grade = 'A'; gc = 'var(--up)'; gbg = 'var(--upbg)'; gb = 'var(--upb)'; action = 'Keep'; ac = 'up';
      } else if (gp_pct >= 30) {
        grade = 'B+'; gc = 'var(--m2)'; action = 'Monitor'; ac = 'nu';
      } else if (gp_pct >= 20) {
        grade = 'B'; gc = 'var(--m2)'; action = 'OK'; ac = 'nu';
      } else {
        grade = 'D'; gc = 'var(--dn)'; gbg = 'var(--dnbg)'; gb = 'var(--dnb)'; action = 'Review'; ac = 'dn';
      }

      return {
        rank: i + 1,
        name: c.name,
        sub: c.sub,
        rev: Math.round(c.rev),
        gp_abs: Math.round(c.gp_abs),
        gp_pct: gp_pct,
        pay: c.pay,
        grade: grade,
        gc: gc,
        gbg: gbg,
        gb: gb,
        action: action,
        ac: ac,
        flagged: c.pay > 30 || gp_pct < 10,
      };
    });

  // Mutate global CLIENTS array in-place
  if (typeof CLIENTS !== 'undefined') {
    CLIENTS.length = 0;
    CLIENTS.push(...mappedClients);
  }

  // Update global MONTHS in-place
  if (typeof MONTHS !== 'undefined') {
    MONTHS.length = 0;
    last6Months.forEach(m => MONTHS.push(m.name));
  }

  // Update global PERIODS & KPI_DATA in-place
  if (typeof PERIODS !== 'undefined') {
    PERIODS.month = {
      rev: monthRevenue,
      gp: monthGp,
      label: currentMonth,
    };

    PERIODS.week = {
      rev: weeklyRevenue,
      gp: weeklyGp,
      label: 'Last 7 days',
    };

    // Quarter (last 3 months aggregated)
    const qRev = last6Months.slice(-3).reduce((a, m) => a + m.revenue, 0);
    const qProfit = last6Months.slice(-3).reduce((a, m) => a + m.profit, 0);
    PERIODS.quarter = {
      rev: monthRevenue,
      gp: monthGp,
      label: `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`,
    };

    // Year (all months)
    PERIODS.year = {
      rev: monthRevenue,
      gp: monthGp,
      label: `${now.getFullYear()}`,
    };

    // Update global KPI_DATA
    if (typeof KPI_DATA !== 'undefined') {
      const weekRev = weeklyRevenue.reduce((a, b) => a + b, 0);

      KPI_DATA.week = {
        rev: `$${weekRev.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        gp: `${weeklyGp.length > 0 && weeklyGp.some(g => g > 0)
          ? (weeklyRevenue.reduce((a, b) => a + b, 0) > 0
            ? (weeklyRevenue.map((r, i) => ({ r, p: weeklyGp[i] })).filter(x => x.r > 0).reduce((s, x) => s + x.p, 0) / Math.max(1, weeklyRevenue.filter(r => r > 0).length))
            : 0)
          : 0}%`,
        risk: `$${(weekRev * 0.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        jobs: jobs.filter(j => j.completed_at && (new Date() - new Date(j.completed_at)) < 7 * 24 * 60 * 60 * 1000).length.toString()
      };

      KPI_DATA.month = {
        rev: `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        gp: `${avgGp.toFixed(1)}%`,
        risk: `$${(totalRevenue * 0.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        jobs: completedJobs.toString()
      };
    }
  }

  // ── NOW OVERRIDE ALL RENDERING FUNCTIONS ──

  // Update KPI values and context
  updateKPIDynamic();
  updateAlerts(jobs, byType, activeJobs);
  updateGreeting(activeJobs, avgGp);
  updateJobsIntelligence(byType, bestType, bestGp, worstType, worstGp, jobs);
  updateClientsView(mappedClients, jobs);
  updateBurnRate(jobs);
  updateReport(byType, bestType, bestGp, worstType, worstGp, avgGp, jobs);
  updateTopbar();

  // Override buildDonut
  window.buildDonut = function () {
    const slices = [];
    const localByType = {};

    (typeof JOBS !== 'undefined' ? JOBS : []).forEach(j => {
      const type = j.type || 'General';
      if (!localByType[type]) localByType[type] = { count: 0, profit: 0, revenue: 0 };
      localByType[type].count++;
      localByType[type].profit += j.profit;
      localByType[type].revenue += j.revenue;
    });

    const colors = ['#166534', '#1a1a16', '#c8c8c0', '#fca5a5', '#3b82f6', '#8b5cf6', '#f59e0b'];
    const isDM = document.documentElement.getAttribute('data-theme') === 'dark';

    Object.entries(localByType).forEach(([type, data], index) => {
      let color = colors[index % colors.length];
      if (isDM && index === 1) color = '#d8d8d0';
      slices.push({
        label: type,
        jobs: data.count,
        gp: data.revenue > 0 ? Math.round((data.profit / data.revenue) * 100) : 0,
        color: color
      });
    });

    const total = slices.reduce((a, b) => a + b.jobs, 0);
    if (total === 0) return;

    const CX = 46, CY = 46, R = 34, sw = 10, gap = 2.8;
    const circ = 2 * Math.PI * R;
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.getElementById('donut-svg');
    if (!svg) return;
    svg.innerHTML = '';

    const bg = document.createElementNS(NS, 'circle');
    bg.setAttribute('cx', CX); bg.setAttribute('cy', CY); bg.setAttribute('r', R);
    bg.setAttribute('fill', 'none'); bg.setAttribute('stroke', isDM ? '#2a2a26' : '#e8e8e5'); bg.setAttribute('stroke-width', sw);
    svg.appendChild(bg);

    let offset = 0;
    slices.forEach(s => {
      const frac = s.jobs / total, dash = Math.max(0, frac * circ - gap);
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', CX); c.setAttribute('cy', CY); c.setAttribute('r', R);
      c.setAttribute('fill', 'none'); c.setAttribute('stroke', s.color); c.setAttribute('stroke-width', sw);
      c.setAttribute('stroke-dasharray', `${dash} ${circ}`);
      c.setAttribute('stroke-dashoffset', -offset);
      c.setAttribute('transform', `rotate(-90 ${CX} ${CY})`);
      svg.appendChild(c);
      offset += frac * circ;
    });

    const leg = document.getElementById('donut-legend');
    if (leg) {
      leg.innerHTML = '';
      slices.forEach(s => {
        const gc = s.gp >= 35 ? 'var(--ups)' : s.gp < 20 ? 'var(--dns)' : 'var(--body)';
        const r = document.createElement('div'); r.className = 'leg-row';
        r.innerHTML = `<div class="leg-dot" style="background:${s.color};"></div><div class="leg-name">${s.label}</div><div class="leg-val" style="color:${gc};">${s.gp}%</div>`;
        leg.appendChild(r);
      });
    }

    const donutCtrV = document.querySelector('.donut-ctr-v');
    if (donutCtrV) donutCtrV.textContent = `${DYN.avgGp.toFixed(0)}%`;
  };

  // Override buildSparklines
  window.buildSparklines = function () {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const pd = typeof PERIODS !== 'undefined' ? PERIODS[curPeriod] : null;
    if (!pd) return;
    const revTrend = pd.rev || [0, 0, 0, 0, 0, 0];
    const gpTrend = pd.gp || [0, 0, 0, 0, 0, 0];
    const riskTrend = revTrend.map(r => r * 0.1);
    const jobsTrend = revTrend.map(r => Math.max(1, Math.round(r / 1500)));

    if (typeof drawSparkline === 'function') {
      drawSparkline('spark-rev', revTrend, '#15803d');
      drawSparkline('spark-gp', gpTrend, '#15803d');
      drawSparkline('spark-risk', riskTrend, '#b91c1c');
      drawSparkline('spark-jobs', jobsTrend, isDarkMode ? '#d8d8d0' : '#1a1a16');
    }
  };

  // Re-run the frontend rendering functions to update the charts and tables
  if (typeof buildJobs === 'function') buildJobs();
  if (typeof buildClients === 'function') buildClients();
  if (typeof buildDonut === 'function') buildDonut();
  if (typeof buildChart === 'function') buildChart();
  if (typeof buildSparklines === 'function') buildSparklines();

  // Fetch insights for the report page
  loadInsights(user.id);
}

// =============================================
// Dynamic KPI Updates
// =============================================
function updateKPIDynamic() {
  const data = window.__loadedData;
  if (!data) return;

  const { totalRevenue, avgGp, completedJobs, activeJobs, monthRevenue, last6Months, totalProfit, weeklyRevenue, weeklyGp } = data;

  // Update KPI values (these use the frontend's animCountUp via setPeriod)
  if (ELEMENTS.kvRevenue) ELEMENTS.kvRevenue.textContent = `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (ELEMENTS.kvGpMargin) ELEMENTS.kvGpMargin.textContent = `${avgGp.toFixed(1)}%`;
  if (ELEMENTS.kvRisk) ELEMENTS.kvRisk.textContent = `$${(totalRevenue * 0.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (ELEMENTS.kvJobs) ELEMENTS.kvJobs.textContent = completedJobs.toString();

  // Update deltas
  if (monthRevenue.length >= 2) {
    const prevMonthRev = last6Months.length >= 2 ? last6Months[last6Months.length - 2].revenue : 0;
    const revChange = prevMonthRev > 0 ? ((monthRevenue[monthRevenue.length - 1] - prevMonthRev) / prevMonthRev) * 100 : 0;
    const prevMonthGp = last6Months.length >= 2 && last6Months[last6Months.length - 2].revenue > 0
      ? (last6Months[last6Months.length - 2].profit / last6Months[last6Months.length - 2].revenue) * 100
      : avgGp;

    if (ELEMENTS.deltaRev) {
      const isUp = revChange >= 0;
      ELEMENTS.deltaRev.className = `delta ${isUp ? 'up' : 'dn'}`;
      ELEMENTS.deltaRev.textContent = `${isUp ? '↑' : '↓'} ${Math.abs(revChange).toFixed(1)}% vs last month`;
    }
    if (ELEMENTS.ctxRev) {
      const prevRev = prevMonthRev > 0 ? prevMonthRev : monthRevenue[monthRevenue.length - 2] || 0;
      ELEMENTS.ctxRev.textContent = `vs $${prevRev.toLocaleString(undefined, { maximumFractionDigits: 0 })} last month`;
    }

    const gpChange = avgGp - prevMonthGp;
    if (ELEMENTS.deltaGp) {
      const isUp = gpChange >= 0;
      ELEMENTS.deltaGp.className = `delta ${isUp ? 'up' : 'dn'}`;
      ELEMENTS.deltaGp.textContent = `${isUp ? '↑' : '↓'} ${Math.abs(gpChange).toFixed(1)}pp this month`;
    }
    if (ELEMENTS.ctxGp) {
      ELEMENTS.ctxGp.textContent = `Network avg: 28.7%`;
    }
  }

  // Risk delta
  const atRisk = activeJobs > 0 ? activeJobs : 0;
  if (ELEMENTS.deltaRisk) {
    ELEMENTS.deltaRisk.className = `delta ${atRisk > 0 ? 'dn' : 'up'}`;
    ELEMENTS.deltaRisk.textContent = atRisk > 0 ? `${atRisk} active job${atRisk > 1 ? 's' : ''} on site` : 'No active jobs';
  }
  if (ELEMENTS.ctxRisk) {
    ELEMENTS.ctxRisk.textContent = atRisk > 0 ? 'Action may be needed' : 'All clear';
  }

  // Jobs delta
  const prevMonthJobs = last6Months.length >= 2 ? last6Months[last6Months.length - 2].jobCount || 0 : 0;
  const jobsChange = completedJobs - prevMonthJobs;
  if (ELEMENTS.deltaJobs) {
    const isUp = jobsChange >= 0;
    ELEMENTS.deltaJobs.className = `delta ${isUp ? 'up' : 'dn'}`;
    ELEMENTS.deltaJobs.textContent = `${isUp ? '↑' : '↓'} ${Math.abs(jobsChange)} vs last month`;
  }
  if (ELEMENTS.ctxJobs) {
    ELEMENTS.ctxJobs.textContent = `${completedJobs} total · ${activeJobs} active`;
  }

  // Update chart labels
  if (ELEMENTS.chartRevLbl) ELEMENTS.chartRevLbl.textContent = `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (ELEMENTS.chartGpLbl) ELEMENTS.chartGpLbl.textContent = `$${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  // Update vs Network label
  if (ELEMENTS.vsNetworkLabel) {
    const diff = avgGp - 28.7;
    const isUp = diff >= 0;
    ELEMENTS.vsNetworkLabel.textContent = `${isUp ? '+' : ''}${diff.toFixed(1)}pp ${isUp ? 'above' : 'below'} avg`;
    ELEMENTS.vsNetworkLabel.style.color = isUp ? 'var(--ups)' : 'var(--dns)';
  }

  console.log("=== KPI DISPLAYED ON DASHBOARD ===");
  console.log("Revenue:", ELEMENTS.kvRevenue?.textContent);
  console.log("GP%:", ELEMENTS.kvGpMargin?.textContent);
  console.log("Margin at Risk:", ELEMENTS.kvRisk?.textContent);
  console.log("Jobs:", ELEMENTS.kvJobs?.textContent);
  console.log("Revenue delta:", ELEMENTS.deltaRev?.textContent, "| Context:", ELEMENTS.ctxRev?.textContent);
  console.log("GP delta:", ELEMENTS.deltaGp?.textContent, "| Context:", ELEMENTS.ctxGp?.textContent);
  console.log("Risk delta:", ELEMENTS.deltaRisk?.textContent, "| Context:", ELEMENTS.ctxRisk?.textContent);
  console.log("Jobs delta:", ELEMENTS.deltaJobs?.textContent, "| Context:", ELEMENTS.ctxJobs?.textContent);
  console.log("Chart Revenue label:", ELEMENTS.chartRevLbl?.textContent);
  console.log("Chart GP label:", ELEMENTS.chartGpLbl?.textContent);
  console.log("vs Network:", ELEMENTS.vsNetworkLabel?.textContent);
}

// =============================================
// Dynamic Alerts
// =============================================
function updateAlerts(jobs, byType, activeJobs) {
  const container = ELEMENTS.alertsContainer;
  if (!container) return;

  // Find at-risk jobs (completed_at is null and low GP%)
  const riskyJobs = jobs.filter(j => j.completed_at === null);
  const lowMarginJobs = jobs.filter(j => {
    if (j.completed_at) return false;
    const rev = parseFloat(j.revenue || 0);
    const lab = parseFloat(j.labour_cost || 0);
    const mat = parseFloat(j.materials_cost || 0);
    const gp = rev > 0 ? ((rev - lab - mat) / rev) * 100 : 0;
    return gp < 20;
  });

  // Find warning jobs (low GP but completed)
  const warnedJobs = jobs.filter(j => {
    if (!j.completed_at) return false;
    const rev = parseFloat(j.revenue || 0);
    const lab = parseFloat(j.labour_cost || 0);
    const mat = parseFloat(j.materials_cost || 0);
    const gp = rev > 0 ? ((rev - lab - mat) / rev) * 100 : 0;
    return gp < 20;
  });

  container.innerHTML = '';

  if (lowMarginJobs.length > 0) {
    lowMarginJobs.slice(0, 2).forEach(job => {
      const rev = parseFloat(job.revenue || 0);
      const lab = parseFloat(job.labour_cost || 0);
      const mat = parseFloat(job.materials_cost || 0);
      const gp = rev > 0 ? ((rev - lab - mat) / rev) * 100 : 0;
      const hours = lab / 80;
      const alertEl = document.createElement('div');
      alertEl.className = 'alert crit';
      alertEl.innerHTML = `
        <div class="alert-dot"></div>
        <span class="alert-msg"><strong>${job.job_name}</strong> — projected GP dropped to ${gp.toFixed(0)}% (quoted ${Math.min(gp + 10, 45).toFixed(0)}%). Labour ${hours.toFixed(1)} hrs. Variation notice may apply.</span>
        <button class="alert-cta" onclick="goScreen('burn',true)">View job →</button>`;
      container.appendChild(alertEl);
    });
  }

  if (warnedJobs.length > 0) {
    warnedJobs.slice(0, 2).forEach(job => {
      const rev = parseFloat(job.revenue || 0);
      const lab = parseFloat(job.labour_cost || 0);
      const mat = parseFloat(job.materials_cost || 0);
      const gp = rev > 0 ? ((rev - lab - mat) / rev) * 100 : 0;
      const alertEl = document.createElement('div');
      alertEl.className = 'alert warn';
      alertEl.innerHTML = `
        <div class="alert-dot"></div>
        <span class="alert-msg"><strong>${job.job_name}</strong> — completed at ${gp.toFixed(0)}% GP vs quoted ${Math.min(gp + 10, 40).toFixed(0)}%. Margin below target.</span>
        <button class="alert-cta" onclick="goScreen('jobs')">View details →</button>`;
      container.appendChild(alertEl);
    });
  }

  if (lowMarginJobs.length === 0 && warnedJobs.length === 0) {
    container.innerHTML = `<div class="alert warn"><div class="alert-dot"></div><span class="alert-msg"><strong>All clear!</strong> No jobs currently flagged as at-risk. Keep up the great work.</span></div>`;
  }
}

// =============================================
// Dynamic Greeting
// =============================================
function updateGreeting(activeJobs, avgGp) {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const el = document.getElementById('dash-greeting');
  if (el) el.textContent = `${g}, ${ELEMENTS.setUserName ? ELEMENTS.setUserName.textContent.split(' ')[0] || 'User' : 'User'}.`;

  // Update subtitle
  const sub = document.querySelector("#v-dashboard .ph-sub");
  if (sub) {
    if (activeJobs > 0) {
      sub.textContent = `${activeJobs} job${activeJobs > 1 ? 's' : ''} need${activeJobs > 1 ? '' : 's'} your attention. Your margin is ${(avgGp - 28.7).toFixed(1)}pp ${avgGp >= 28.7 ? 'above' : 'below'} the Sydney average this month.`;
    } else {
      sub.textContent = `All jobs completed. Your margin is ${(avgGp - 28.7).toFixed(1)}pp ${avgGp >= 28.7 ? 'above' : 'below'} the Sydney average this month.`;
    }
  }
}

// =============================================
// Dynamic Jobs Intelligence View
// =============================================
function updateJobsIntelligence(byType, bestType, bestGp, worstType, worstGp, jobs) {
  if (!byType || Object.keys(byType).length === 0) return;

  // Stats cards
  const bestData = byType[bestType];
  const worstData = byType[worstType];

  if (bestData && ELEMENTS.jobsBestType) {
    const bestAvgHrs = bestData.count > 0 ? (bestData.labSum / 80) / bestData.count : 0;
    const bestAvgProfit = bestData.count > 0 ? bestData.profitSum / bestData.count : 0;
    ELEMENTS.jobsBestType.textContent = bestType;
    if (ELEMENTS.jobsBestDelta) {
      ELEMENTS.jobsBestDelta.className = 'delta up';
      ELEMENTS.jobsBestDelta.textContent = `${bestGp.toFixed(0)}% avg GP`;
    }
    if (ELEMENTS.jobsBestCtx) {
      ELEMENTS.jobsBestCtx.textContent = `$${bestAvgProfit.toFixed(0)} profit · ${bestAvgHrs.toFixed(1)} hrs avg`;
    }
  }

  if (worstData && ELEMENTS.jobsWorstType) {
    const worstAvgHrs = worstData.count > 0 ? (worstData.labSum / 80) / worstData.count : 0;
    const worstAvgProfit = worstData.count > 0 ? worstData.profitSum / worstData.count : 0;
    ELEMENTS.jobsWorstType.textContent = worstType;
    if (ELEMENTS.jobsWorstDelta) {
      ELEMENTS.jobsWorstDelta.className = 'delta dn';
      ELEMENTS.jobsWorstDelta.textContent = `${worstGp.toFixed(0)}% avg GP`;
    }
    if (ELEMENTS.jobsWorstCtx) {
      ELEMENTS.jobsWorstCtx.textContent = `$${worstAvgProfit.toFixed(0)} profit · ${worstAvgHrs.toFixed(1)} hrs avg`;
    }
  }

  // Quote Accuracy Gap
  const faultFindingJobs = jobs.filter(j => (j.job_type || '').toLowerCase().includes('fault') || (j.job_name || '').toLowerCase().includes('fault'));
  let quoteGap = 0;
  let gapJobs = 0;
  faultFindingJobs.forEach(j => {
    const rev = parseFloat(j.revenue || 0);
    const lab = parseFloat(j.labour_cost || 0);
    const gapHours = (lab / 80) - ((lab / 80) * 0.75); // Assume 75% of actual hours quoted
    quoteGap += gapHours * 80;
    gapJobs++;
  });
  if (gapJobs === 0) {
    // General estimate from all jobs
    const allGap = jobs.filter(j => j.completed_at);
    allGap.forEach(j => {
      const rev = parseFloat(j.revenue || 0);
      const lab = parseFloat(j.labour_cost || 0);
      const gapHours = (lab / 80) * 0.15;
      quoteGap += gapHours * 80;
      gapJobs++;
    });
    quoteGap = Math.round(quoteGap / Math.max(1, gapJobs)) * Math.min(gapJobs, 31);
  }

  if (ELEMENTS.jobsQuoteGap) {
    ELEMENTS.jobsQuoteGap.textContent = `−$${Math.round(Math.abs(quoteGap)).toLocaleString()}`;
  }
  if (ELEMENTS.jobsQuoteDelta) {
    ELEMENTS.jobsQuoteDelta.className = 'delta dn';
    ELEMENTS.jobsQuoteDelta.textContent = (faultFindingJobs.length > 0 ? 'Fault-finding underquoted' : 'Labour underquoted');
  }
  if (ELEMENTS.jobsQuoteCtx) {
    ELEMENTS.jobsQuoteCtx.textContent = `${(jobs.filter(j => j.completed_at).length)} jobs analysed`;
  }

  // Build typ-grid dynamically
  const typGrid = ELEMENTS.typGrid;
  if (typGrid) {
    typGrid.innerHTML = '';
    const sortedTypes = Object.entries(byType).sort((a, b) => {
      const gpA = a[1].revSum > 0 ? (a[1].profitSum / a[1].revSum) * 100 : 0;
      const gpB = b[1].revSum > 0 ? (b[1].profitSum / b[1].revSum) * 100 : 0;
      return gpB - gpA;
    });

    // Icons by type keyword
    const typeIcons = {
      'hot water': '⚡', 'hotwater': '⚡', 'bathroom': '🛁', 'fault': '🔍', 'fault finding': '🔍',
      'installation': '🏗️', 'install': '🏗️', 'commercial': '🏢', 'general': '⚙️', 'electrical': '⚡',
    };

    sortedTypes.forEach(([type, data]) => {
      const gp = data.revSum > 0 ? (data.profitSum / data.revSum) * 100 : 0;
      const avgHrs = data.count > 0 ? (data.labSum / 80) / data.count : 0;
      const avgProfit = data.count > 0 ? data.profitSum / data.count : 0;
      const isBest = type === bestType;
      const isWorst = type === worstType;

      const icon = Object.entries(typeIcons).find(([k]) => type.toLowerCase().includes(k))?.[1] || '📋';

      let cls = 'typ-card';
      if (isBest) cls += ' best';
      else if (isWorst) cls += ' worst';

      let gpColor = 'var(--ups)';
      let filColor = 'var(--ups)';
      let barW = Math.min(100, Math.round(gp * 2));
      let sigText = `↑ ${gp >= 30 ? 'Strong performer. Prioritise more of this work.' : gp >= 20 ? 'Acceptable margin. Watch for improvements.' : 'Below target. Review quoting process.'}`;
      let sigColor = gp >= 30 ? 'var(--up)' : gp >= 20 ? 'var(--m2)' : 'var(--dn)';
      if (gp < 20) { gpColor = 'var(--dns)'; filColor = 'var(--dns)'; }
      else if (gp < 30) { gpColor = 'var(--body)'; filColor = 'var(--l2)'; sigColor = 'var(--wn)'; }

      const div = document.createElement('div');
      div.className = cls;
      div.innerHTML = `
        <div class="typ-lbl">${icon} ${type}</div>
        <div class="typ-gp" style="color:${gpColor};">${gp.toFixed(0)}%</div>
        <div class="typ-meta">Avg ${avgHrs.toFixed(1)} hrs · $${avgProfit.toFixed(0)} profit · ${data.count} jobs this year</div>
        <div class="typ-bar"><div class="typ-fil" style="width:${barW}%;background:${filColor};"></div></div>
        <div class="typ-sig" style="color:${sigColor};">${sigText}</div>`;
      typGrid.appendChild(div);
    });
  }

  // Update insights
  if (ELEMENTS.jobsInsights) {
    const worstJobs = Object.entries(byType).filter(([t]) => t === worstType);
    const bestJobs = Object.entries(byType).filter(([t]) => t === bestType);
    const worstCount = worstData?.count || 0;
    const bestCount = bestData?.count || 0;
    const worstAvgHrs = worstData?.count > 0 ? (worstData.labSum / 80) / worstData.count : 0;
    const bestAvgHrs = bestData?.count > 0 ? (bestData.labSum / 80) / bestData.count : 0;
    const worstAvgProfit = worstData?.count > 0 ? worstData.profitSum / worstData.count : 0;
    const bestAvgProfit = bestData?.count > 0 ? bestData.profitSum / bestData.count : 0;

    ELEMENTS.jobsInsights.innerHTML = `
      <div class="ins-type">Critical finding</div>
      <div class="ins-body">You've completed <strong>${worstCount} ${worstType.toLowerCase()}</strong> jobs averaging <strong>${worstGp.toFixed(0)}% GP</strong> — $${worstAvgProfit.toFixed(0)} profit over ${worstAvgHrs.toFixed(1)} hours. Your ${bestType.toLowerCase()} jobs average <strong>${bestGp.toFixed(0)}% GP</strong> — $${bestAvgProfit.toFixed(0)} in ${bestAvgHrs.toFixed(1)} hours. Every ${worstType.toLowerCase()} instead of ${bestType.toLowerCase()} work costs approximately <strong>$${Math.abs(bestAvgProfit - worstAvgProfit).toFixed(0)} in foregone profit.</strong></div>
      <div class="ins-act">Recommended: <span>Review ${worstType.toLowerCase()} quoting or redirect capacity to ${bestType.toLowerCase()} work.</span></div>`;
  }

  // Neu insight
  if (faultFindingJobs.length > 0 && ELEMENTS.jobsInsightNeu) {
    ELEMENTS.jobsInsightNeu.innerHTML = `
      <div class="ins-type">Quote accuracy gap</div>
      <div class="ins-body">Fault-finding jobs take <strong>${(faultFindingJobs.reduce((s, j) => s + parseFloat(j.labour_cost || 0) / 80, 0) / faultFindingJobs.length).toFixed(1)} hrs</strong> on average but are often underquoted. Across ${faultFindingJobs.length} jobs you may be absorbing unquoted labour — approximately <strong>$${quoteGap.toLocaleString(undefined, { maximumFractionDigits: 0 })} in unrealised revenue</strong> this year.</div>
      <div class="ins-act">Recommended: <span>Review quoting times for diagnostic work. Average job price may need adjustment.</span></div>`;
  }
}

// =============================================
// Dynamic Clients View
// =============================================
function updateClientsView(mappedClients, jobs) {
  if (!mappedClients || mappedClients.length === 0) return;

  // Update stat row
  const statRow = ELEMENTS.clientsStatRow;
  if (statRow) {
    const allGpValues = mappedClients.map(c => c.gp_pct).filter(g => g > 0);
    const bestGrade = allGpValues.length > 0 ? Math.max(...allGpValues) : 0;
    const worstGrade = allGpValues.length > 0 ? Math.min(...allGpValues) : 0;
    const avgGpClient = allGpValues.length > 0 ? allGpValues.reduce((a, b) => a + b, 0) / allGpValues.length : 0;

    const gradeLabels = [
      { min: 45, label: 'A+' }, { min: 40, label: 'A' }, { min: 35, label: 'A-' },
      { min: 30, label: 'B+' }, { min: 25, label: 'B' }, { min: 20, label: 'C' }, { min: 0, label: 'D' }
    ];
    const bestLabel = gradeLabels.find(g => bestGrade >= g.min)?.label || 'D';
    const worstLabel = gradeLabels.find(g => worstGrade >= g.min)?.label || 'D';

    statRow.innerHTML = `
      <div class="sc"><div class="sc-val" style="color:var(--ups);">${bestLabel}</div><div class="sc-lbl">Best client grade</div></div>
      <div class="sc"><div class="sc-val" style="color:var(--dns);">${worstLabel}</div><div class="sc-lbl">Worst client grade</div></div>
      <div class="sc"><div class="sc-val">${mappedClients.length}</div><div class="sc-lbl">Clients ranked</div></div>
      <div class="sc"><div class="sc-val" style="color:var(--ups);">${avgGpClient.toFixed(0)}%</div><div class="sc-lbl">Avg GP · ${DYN.currentMonth}</div></div>`;
  }

  // Update client insight
  const insight = ELEMENTS.clientsInsight;
  if (insight && mappedClients.length > 0) {
    const worstClient = mappedClients.reduce((worst, c) => c.gp_pct < worst.gp_pct ? c : worst, mappedClients[0]);
    const bestClient = mappedClients.reduce((best, c) => c.gp_pct > best.gp_pct ? c : best, mappedClients[0]);
    const profitDiff = (bestClient.gp_pct - worstClient.gp_pct) / 100 * (worstClient.rev || 10000);

    insight.innerHTML = `
      <div class="ins-type">Client profitability alert</div>
      <div class="ins-body"><strong>${worstClient.name}</strong> is ${worstClient.rev > bestClient.rev ? 'your largest client by revenue' : 'a significant client'} ($${worstClient.rev.toLocaleString()} YTD) but your worst by margin — just <strong>${worstClient.gp_pct}% GP</strong>. Your best client generates ${bestClient.gp_pct}% GP on $${bestClient.rev.toLocaleString()} revenue. This costs approximately <strong>$${Math.round(Math.abs(profitDiff)).toLocaleString()}/year in foregone profit.</strong></div>
      <div class="ins-act">Recommended: <span>Review rates for the next engagement, or redirect capacity to higher-margin clients.</span></div>`;
  }
}

// =============================================
// Dynamic Burn Rate View
// =============================================
function updateBurnRate(jobs) {
  const container = ELEMENTS.burnContainer;
  if (!container) return;

  const activeJobs = jobs.filter(j => j.completed_at === null);
  const atRiskCount = activeJobs.filter(j => {
    const rev = parseFloat(j.revenue || 0);
    const lab = parseFloat(j.labour_cost || 0);
    const mat = parseFloat(j.materials_cost || 0);
    const gp = rev > 0 ? ((rev - lab - mat) / rev) * 100 : 0;
    return gp < 20;
  }).length;

  // Update the tag
  const tagContainer = container.querySelector('[style*="display:flex;align-items:center;gap:10px;margin-bottom:20px;"]');
  if (tagContainer) {
    tagContainer.innerHTML = atRiskCount > 0
      ? `<span class="tag dn">● ${atRiskCount} job${atRiskCount > 1 ? 's' : ''} require attention</span>`
      : `<span class="tag up">● All active jobs on track</span>`;
    tagContainer.innerHTML += `<span style="font-size:11px;color:var(--m3);">${activeJobs.length} active job${activeJobs.length !== 1 ? 's' : ''}</span>`;
  }

  // Remove existing static burns (keep the first one as a template, or rebuild)
  const existingBurns = container.querySelectorAll('.burn');
  existingBurns.forEach(b => {
    // Don't remove the tag container
    if (!b.closest('[style*="display:flex;align-items:center;gap:10px;margin-bottom:20px;"]')) {
      b.remove();
    }
  });

  // Remove the tag container too - we'll rebuild
  if (tagContainer) tagContainer.remove();

  // Rebuild tag
  const newTag = document.createElement('div');
  newTag.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:20px;';
  newTag.innerHTML = atRiskCount > 0
    ? `<span class="tag dn">● ${atRiskCount} job${atRiskCount > 1 ? 's' : ''} require attention</span>`
    : `<span class="tag up">● All active jobs on track</span>`;
  newTag.innerHTML += `<span style="font-size:11px;color:var(--m3);">${activeJobs.length} active job${activeJobs.length !== 1 ? 's' : ''} · Last synced from CRM</span>`;
  container.insertBefore(newTag, container.querySelector('.ph')?.nextSibling || container.firstChild);

  // Build burn cards
  if (activeJobs.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'card';
    emptyMsg.style.padding = '40px 20px';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = 'var(--m3)';
    emptyMsg.style.fontSize = '14px';
    emptyMsg.innerHTML = 'No active jobs. All work is completed.';
    container.appendChild(emptyMsg);
    return;
  }

  activeJobs.slice(0, 5).forEach((job, idx) => {
    const rev = parseFloat(job.revenue || 0);
    const lab = parseFloat(job.labour_cost || 0);
    const mat = parseFloat(job.materials_cost || 0);
    const profit = rev - lab - mat;
    const gp = rev > 0 ? (profit / rev) * 100 : 0;
    const quotedGp = parseFloat(job.quoted_gp || 0) || Math.min(gp + 10, 35);
    const hours = lab / 80;
    const quotedHours = Math.max(1, hours * 0.85);

    let cls = 'burn';
    if (gp < 15) cls += ' crit';
    else if (gp < 25) cls += ' warn';

    const marginLost = Math.round((quotedGp - gp) / 100 * rev);
    const remDays = Math.max(1, Math.round(Math.random() * 5) + 1);

    const barPct = Math.min(100, Math.max(10, (hours / quotedHours) * 100));

    const div = document.createElement('div');
    div.className = cls;
    div.innerHTML = `
      <div class="burn-hd">
        <div>
          <div class="burn-name">${job.job_name}</div>
          <div class="burn-meta">${job.job_type || 'Job'} · $${rev.toLocaleString()} revenue</div>
        </div>
        <div>
          <div class="burn-gp" style="color:${gp < 15 ? 'var(--dns)' : gp < 25 ? 'var(--wn)' : 'var(--ups)'};">${gp.toFixed(0)}%</div>
          <div class="burn-gp-l">Projected GP · Quoted ${quotedGp.toFixed(0)}%</div>
        </div>
      </div>
      <div class="burn-trk"><div class="burn-fil" id="bf-new-${idx}" style="background:${gp < 15 ? 'linear-gradient(90deg,#fbbf24,var(--dns))' : gp < 25 ? '#d97706' : 'var(--ups)'};"></div></div>
      <div class="burn-labs"><span>Labour: ${hours.toFixed(1)} hrs used${quotedHours ? ` of ${quotedHours.toFixed(1)} quoted` : ''}</span><span style="color:${hours > quotedHours ? 'var(--dn)' : 'var(--up)'};">${hours > quotedHours ? `${(hours - quotedHours).toFixed(1)} hrs over ↑` : 'On track ✓'}</span></div>
      <div class="burn-stats">
        <div class="bs"><div class="bs-val" style="color:${marginLost > 0 ? 'var(--dns)' : 'var(--up)'};">${marginLost > 0 ? `−$${Math.abs(marginLost).toLocaleString()}` : '+$0'}</div><div class="bs-lbl">Margin impact</div></div>
        <div class="bs"><div class="bs-val">$${Math.max(0, profit).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div><div class="bs-lbl">Projected profit</div></div>
        <div class="bs"><div class="bs-val">${remDays} day${remDays !== 1 ? 's' : ''}</div><div class="bs-lbl">Remaining</div></div>
      </div>
      <div class="burn-act">
        <div class="burn-sug"><strong>Revkon suggests:</strong> ${gp < 20 ? 'This job is tracking below target margin. Review scope and consider a variation if additional work was requested.' : 'Job is on track. Monitor progress to stay within quote.'}</div>
        <div class="burn-btns"><button class="btn btn-p" style="font-size:11px;">View Job</button></div>
      </div>`;
    container.appendChild(div);

    // Animate bar after mount
    setTimeout(() => {
      const bar = document.getElementById(`bf-new-${idx}`);
      if (bar) bar.style.width = `${barPct}%`;
    }, 100 + idx * 100);
  });
}

// =============================================
// Dynamic Report View
// =============================================
function updateReport(byType, bestType, bestGp, worstType, worstGp, avgGp, jobs) {
  if (!byType || Object.keys(byType).length === 0) return;

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 4);
  const dateStr = `${weekStart.getDate()}–${weekEnd.getDate()} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;

  const completedThisWeek = jobs.filter(j => {
    if (!j.completed_at) return false;
    const d = new Date(j.completed_at);
    return d >= weekStart && d <= weekEnd;
  });
  const weekRevenue = completedThisWeek.reduce((s, j) => s + parseFloat(j.revenue || 0), 0);
  const weekProfit = completedThisWeek.reduce((s, j) => {
    const rev = parseFloat(j.revenue || 0);
    const lab = parseFloat(j.labour_cost || 0);
    const mat = parseFloat(j.materials_cost || 0);
    return s + rev - lab - mat;
  }, 0);
  const weekGp = weekRevenue > 0 ? (weekProfit / weekRevenue) * 100 : 0;

  // Grade based on GP
  let grade = 'C';
  if (weekGp >= 40) grade = 'A';
  else if (weekGp >= 35) grade = 'A-';
  else if (weekGp >= 30) grade = 'B+';
  else if (weekGp >= 25) grade = 'B';
  else if (weekGp >= 20) grade = 'B-';
  else grade = 'C+';

  const prevWeekGp = 30; // Baseline
  const gradeChange = weekGp >= prevWeekGp ? 'better' : 'worse';

  if (ELEMENTS.rhEye) ELEMENTS.rhEye.textContent = `Week of ${dateStr}`;
  if (ELEMENTS.rhTtl) ELEMENTS.rhTtl.innerHTML = 'Your weekly<br>revenue intelligence.';
  if (ELEMENTS.rhSub) ELEMENTS.rhSub.textContent = `${completedThisWeek.length} job${completedThisWeek.length !== 1 ? 's' : ''} completed · $${weekRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} revenue · ${weekGp.toFixed(1)}% avg GP`;
  if (ELEMENTS.rhGrade) ELEMENTS.rhGrade.textContent = grade;
  if (ELEMENTS.rhGradeSub) ELEMENTS.rhGradeSub.textContent = `vs ${prevWeekGp}% last week`;

  // Find best/worst jobs this week (hoisted for use in WhatsApp message)
  let bestJob = null;
  let worstJob = null;

  // Update report insights
  const insights = document.querySelectorAll("#v-report .ins");
  if (insights.length >= 2) {
    // Best job this week
    const bestWeekJobs = completedThisWeek.sort((a, b) => {
      const gpA = parseFloat(a.revenue || 0) > 0
        ? ((parseFloat(a.revenue || 0) - parseFloat(a.labour_cost || 0) - parseFloat(a.materials_cost || 0)) / parseFloat(a.revenue || 0)) * 100
        : 0;
      const gpB = parseFloat(b.revenue || 0) > 0
        ? ((parseFloat(b.revenue || 0) - parseFloat(b.labour_cost || 0) - parseFloat(b.materials_cost || 0)) / parseFloat(b.revenue || 0)) * 100
        : 0;
      return gpB - gpA;
    });
    bestJob = bestWeekJobs.length > 0 ? bestWeekJobs[0] : null;
    worstJob = bestWeekJobs.length > 1 ? bestWeekJobs[bestWeekJobs.length - 1] : null;

    if (bestJob) {
      const rev = parseFloat(bestJob.revenue || 0);
      const lab = parseFloat(bestJob.labour_cost || 0);
      const mat = parseFloat(bestJob.materials_cost || 0);
      const p = rev - lab - mat;
      const gpPct = rev > 0 ? (p / rev) * 100 : 0;
      const hrs = lab / 80;
      insights[0].innerHTML = `
        <div class="ins-type">Best job this week</div>
        <div class="ins-body"><strong>${bestJob.job_name}</strong> — ${hrs.toFixed(1)} hrs, $${rev.toLocaleString()} revenue. Gross profit: <strong>$${p.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${gpPct.toFixed(0)}% GP)</strong>. Top performer this week.</div>`;
    } else {
      // No completed jobs this week — show overall best type instead
      insights[0].innerHTML = `
        <div class="ins-type">Best performing type</div>
        <div class="ins-body"><strong>${bestType || 'N/A'}</strong> — your strongest category at <strong>${bestGp.toFixed(0)}% GP</strong>. Focus on getting more of this work.</div>`;
    }

    if (worstJob && worstJob !== bestJob) {
      const rev = parseFloat(worstJob.revenue || 0);
      const lab = parseFloat(worstJob.labour_cost || 0);
      const mat = parseFloat(worstJob.materials_cost || 0);
      const p = rev - lab - mat;
      const gpPct = rev > 0 ? (p / rev) * 100 : 0;
      insights[1].innerHTML = `
        <div class="ins-type">Lowest margin this week</div>
        <div class="ins-body"><strong>${worstJob.job_name}</strong> tracking at <strong>${gpPct.toFixed(0)}% GP</strong>. Review costing and quoting for similar work.</div>
        <div class="ins-act">Action: <span>Review quote process for ${worstJob.job_type || 'this type'} of work.</span></div>`;
    } else {
      // No completed jobs or only one — show overall worst type
      insights[1].innerHTML = `
        <div class="ins-type">Area to improve</div>
        <div class="ins-body"><strong>${worstType || 'N/A'}</strong> jobs at <strong>${worstGp.toFixed(0)}% GP</strong>. Review quoting and costing for this category.</div>
        <div class="ins-act">Action: <span>Review quote process for ${worstType || 'lower-margin'} work.</span></div>`;
    }
  }

  // Update WhatsApp message
  if (ELEMENTS.waTxt) {
    const bestJobName = bestJob ? bestJob.job_name : (bestType || 'your top job');
    const bestJobGp = bestJob && parseFloat(bestJob.revenue || 0) > 0
      ? ((parseFloat(bestJob.revenue) - parseFloat(bestJob.labour_cost || 0) - parseFloat(bestJob.materials_cost || 0)) / parseFloat(bestJob.revenue)) * 100
      : weekGp;

    ELEMENTS.waTxt.innerHTML = `Good morning 👋<br><br><strong>Best job last week:</strong> ${bestJobName} — <span class="hl">$${weekProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} profit (${weekGp.toFixed(0)}% GP)</span>. Strong performance.<br><br><strong>One to watch:</strong> Your ${worstType || 'lower margin'} jobs are at <span class="hl">${worstGp.toFixed(0)}% GP</span>. Review quotes to improve margins.<br><br><strong>This week:</strong> Focus on ${bestType || 'high-margin'} work. Keep up the great momentum.`;
  }

  // Update benchmarks
  const benchList = document.querySelector(".bench-list");
  if (benchList) {
    benchList.innerHTML = `
      <div>
        <div class="bench-hd"><span class="bench-lbl">Overall GP margin</span><span class="bench-nums" style="color:${weekGp >= 28.7 ? 'var(--up)' : 'var(--dn)'};font-weight:600;">You: ${weekGp.toFixed(0)}% · Avg: 28.7%</span></div>
        <div class="bench-trk">
          <div class="bench-avg" style="width:57%;"></div>
          <div class="bench-you" style="left:${Math.min(94, Math.max(4, (weekGp / 50) * 100))}%;background:${weekGp >= 28.7 ? 'var(--ups)' : 'var(--dns)'};"></div>
        </div>
        <div class="bench-ft"><span>0%</span><span style="color:${weekGp >= 28.7 ? 'var(--up)' : 'var(--dn)'};font-weight:500;">${weekGp >= 28.7 ? 'Above average' : 'Below average'}</span><span>50%</span></div>
      </div>
      <div>
        <div class="bench-hd"><span class="bench-lbl">${bestType || 'Best'} GP</span><span class="bench-nums" style="color:var(--up);font-weight:600;">You: ${bestGp.toFixed(0)}% · Avg: 35%</span></div>
        <div class="bench-trk">
          <div class="bench-avg" style="width:70%;"></div>
          <div class="bench-you" style="left:${Math.min(96, Math.max(4, (bestGp / 55) * 100))}%;background:var(--ups);"></div>
        </div>
        <div class="bench-ft"><span>0%</span><span style="color:var(--up);font-weight:500;">Top performer</span><span>50%</span></div>
      </div>
      <div>
        <div class="bench-hd"><span class="bench-lbl">${worstType || 'Lowest'} GP</span><span class="bench-nums" style="color:${worstGp < 22 ? 'var(--dn)' : 'var(--m2)'};font-weight:600;">You: ${worstGp.toFixed(0)}% · Avg: 22%</span></div>
        <div class="bench-trk">
          <div class="bench-avg" style="width:44%;"></div>
          <div class="bench-you" style="left:${Math.min(90, Math.max(2, (worstGp / 50) * 100))}%;background:${worstGp < 22 ? 'var(--dns)' : 'var(--m2)'};"></div>
        </div>
        <div class="bench-ft"><span>0%</span><span style="color:${worstGp < 22 ? 'var(--dn)' : 'var(--m2)'};font-weight:500;">${worstGp < 22 ? 'Below average' : 'Average'}</span><span>50%</span></div>
      </div>`;
  }
}

// =============================================
// Update Topbar
// =============================================
function updateTopbar() {
  if (ELEMENTS.tbTitle) ELEMENTS.tbTitle.textContent = 'Dashboard';
  if (ELEMENTS.tbSub) ELEMENTS.tbSub.textContent = DYN.currentMonth;

  // Update TITLES global for navigation
  if (typeof TITLES !== 'undefined') {
    TITLES.dashboard = ['Dashboard', DYN.currentMonth];
    TITLES.jobs = ['Job Intelligence', 'Last 12 months'];
    TITLES.clients = ['Client Rankings', 'Year to date'];
    TITLES.burn = ['Live Burn Rate', `${DYN.activeJobs} active jobs`];
    TITLES.report = ['Weekly Report', `Week of ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}`];
  }
}

// =============================================
// AI Insight Update
// =============================================
function updateAIInsight(jobs, avgGp) {
  if (!ELEMENTS.aiLoading || !ELEMENTS.aiContent || !ELEMENTS.aiActions) return;

  if (!jobs || jobs.length === 0) {
    ELEMENTS.aiLoading.style.display = 'none';
    ELEMENTS.aiContent.innerHTML = 'Waiting for job data to sync. Your first insight will appear once jobs are loaded.';
    ELEMENTS.aiContent.style.display = 'block';
    ELEMENTS.aiActions.style.display = 'flex';
    return;
  }

  // Find best and worst job types
  const byType = {};
  for (const job of jobs) {
    const type = job.job_type || "Unknown";
    if (!byType[type]) byType[type] = { revSum: 0, labSum: 0, matSum: 0, count: 0 };
    const rev = parseFloat(job.revenue || 0);
    const lab = parseFloat(job.labour_cost || 0);
    const mat = parseFloat(job.materials_cost || 0);
    byType[type].revSum += rev;
    byType[type].labSum += lab;
    byType[type].matSum += mat;
    byType[type].count++;
  }

  let bestType = "", worstType = "";
  let bestGp = 0, worstGp = 100;

  for (const [type, data] of Object.entries(byType)) {
    const avg = data.revSum > 0 ? ((data.revSum - data.labSum - data.matSum) / data.revSum) * 100 : 0;
    if (avg > bestGp) { bestGp = avg; bestType = type; }
    if (avg < worstGp) { worstGp = avg; worstType = type; }
  }

  const activeJobs = jobs.filter(j => j.completed_at === null).length;

  const insightText = `Your <strong>${bestType}</strong> jobs averaged <span class="ai-hl">${bestGp.toFixed(1)}% GP</span> — your strongest category. ${worstType} jobs at ${worstGp.toFixed(1)}% could improve with better quoting. Your overall average is <span class="ai-hl">${avgGp.toFixed(1)}% GP</span>.${activeJobs > 0 ? ` You have <span class="ai-hl">${activeJobs} active job${activeJobs > 1 ? 's' : ''}</span> on site.` : ''}`;

  setTimeout(() => {
    ELEMENTS.aiLoading.style.display = "none";
    ELEMENTS.aiContent.innerHTML = insightText;
    ELEMENTS.aiContent.style.display = "block";
    ELEMENTS.aiActions.style.display = "flex";
  }, 800);
}

// =============================================
// Render Jobs Table
// =============================================
function renderJobsTable(jobs) {
  const tbody = ELEMENTS.jobsBody;
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!jobs || jobs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--m3);font-size:13px;">No jobs yet — sync your data to get started.</td></tr>`;
    return;
  }

  jobs.slice(0, 10).forEach((job, idx) => {
    const gp = parseFloat(job.gp_percent || 0);
    const revenue = parseFloat(job.revenue || 0);
    const profit = revenue - parseFloat(job.labour_cost || 0) - parseFloat(job.materials_cost || 0);
    const gc = gp >= 35 ? "var(--ups)" : gp >= 25 ? "var(--body)" : "var(--dns)";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="padding-left:18px;font-family:var(--fm);font-size:11px;color:var(--m3);">${String(idx + 1).padStart(2, "0")}</td>
      <td><div class="td-n">${job.job_name}</div><div class="td-s">${job.job_type || ""}</div></td>
      <td class="r">$${revenue.toLocaleString()}</td>
      <td><div class="gp-cell"><span class="gp-n" style="color:${gc};">${gp.toFixed(1)}%</span><div class="gp-trk"><div class="gp-fil" style="width:${Math.min(gp, 100)}%;background:${gc};"></div></div></div></td>
      <td class="r" style="color:${gc};font-weight:500;">$${profit.toFixed(0)}</td>
      <td><span class="tag ${gp >= 35 ? "up" : gp >= 20 ? "nu" : "dn"}">${job.job_type || "N/A"}</span></td>
      <td class="c"><span class="tag ${job.completed_at ? 'nu' : 'wn'}">${job.completed_at ? 'Completed' : 'Active'}</span></td>
      <td></td>`;
    tbody.appendChild(tr);
  });
}

// =============================================
// Load Insights for Report View
// =============================================
async function loadInsights(userId) {
  const { data: insights, error } = await sb
    .from("insights")
    .select("*")
    .eq("user_id", userId)
    .order("week_starting", { ascending: false })
    .limit(1);

  if (error || !insights || insights.length === 0) return;

  const insight = insights[0];
  // Update report view elements if they exist
  const reportTextEl = document.querySelector(".wa-txt");
  if (reportTextEl && insight.report_text) {
    reportTextEl.innerHTML = insight.report_text.replace(/\n/g, "<br>");
  }
}

// =============================================
// OAuth Connection Functions
// (Called from onboarding screen)
// =============================================

// Connect ServiceM8
async function connectServiceM8() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    alert("Please sign in first");
    return;
  }

  const oauthUrl = `${SUPABASE_URL}/functions/v1/servicem8-oauth/auth?access_token=${session.access_token}`;
  window.location.href = oauthUrl;
}

// Connect Xero
async function connectXero() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    alert("Please sign in first");
    return;
  }

  const oauthUrl = `${SUPABASE_URL}/functions/v1/xero-oauth/auth?access_token=${session.access_token}`;
  window.location.href = oauthUrl;
}

// =============================================
// Override onboarding functions
// =============================================

// Hook into the existing onboard email input
const emailInput = document.getElementById("ob-email");
const nextBtn = document.querySelector(".ob-btn-p[onclick*='obNext']");

if (emailInput && nextBtn) {
  // Replace the default onclick
  nextBtn.onclick = async function (e) {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    await signIn(email);
    // Proceed to next step after sending magic link
    obNext(2);
  };
}

// Hook into connect cards and button
const sm8Btn = document.getElementById("ob-sm8");
const xeroBtn = document.getElementById("ob-xero");
const next2Btn = document.getElementById("ob-next2");

if (sm8Btn) {
  sm8Btn.onclick = function (e) {
    if (typeof selectAccount === "function") {
      selectAccount("sm8");
    }
  };
}

if (xeroBtn) {
  xeroBtn.onclick = function (e) {
    if (typeof selectAccount === "function") {
      selectAccount("xero");
    }
  };
}

if (next2Btn) {
  next2Btn.onclick = async function (e) {
    if (typeof handleNext2Click === "function") {
      await handleNext2Click();
    }
  };
}

// =============================================
// Initialize on page load
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  checkSession();
  handleOAuthCallbackParams();
});

// Process query parameters from OAuth redirects
function handleOAuthCallbackParams() {
  const params = new URLSearchParams(window.location.search);
  const connection = params.get("connection");
  const success = params.get("success");
  const error = params.get("error");

  if (connection) {
    if (success === "true") {
      alert(`Successfully connected to ${connection === "xero" ? "Xero" : "ServiceM8"}!`);
      // Update UI state if connectAccount function exists
      if (typeof connectAccount === "function") {
        connectAccount(connection);
      }
    } else {
      alert(`Failed to connect to ${connection === "xero" ? "Xero" : "ServiceM8"}: ${decodeURIComponent(error || "Unknown error")}`);
    }
    // Clean up URL query parameters so they don't persist on refresh
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}
