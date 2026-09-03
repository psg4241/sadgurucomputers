/**
 * SADGURU COMPUTERS - Interactive JavaScript
 * Real Photographic Showcase & Repair Estimator Engine
 * Doorstep Computer & Printer Repair, Custom PC Builds, AMC (Boisar)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroPhotoGallery();
  initRepairEstimator();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. HERO PHOTOGRAPHIC GALLERY SWITCHER
   ========================================================================== */
function initHeroPhotoGallery() {
  const mainPhoto = document.getElementById('heroMainPhoto');
  const chipBtns = document.querySelectorAll('.gallery-chip-btn');
  if (!mainPhoto || !chipBtns.length) return;

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetSrc = btn.dataset.img;
      if (!targetSrc) return;

      // Smooth fade transition
      mainPhoto.style.opacity = '0.2';
      mainPhoto.style.transform = 'scale(0.97)';
      
      setTimeout(() => {
        mainPhoto.src = targetSrc;
        mainPhoto.style.opacity = '1';
        mainPhoto.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE REPAIR ESTIMATE CALCULATOR
   ========================================================================== */
const ESTIMATOR_DATA = {
  laptop: {
    categoryName: 'Laptop Repair & Upgrades',
    baseVisitCharge: 200,
    doorstepTime: '1 - 2 Hours at Doorstep in Boisar',
    warranty: '3 to 12 Months Warranty on Parts',
    issues: [
      { id: 'lap_os', name: 'Windows 10/11 Fresh Install + Antivirus Setup', minPrice: 499, maxPrice: 650, recommended: true, desc: 'Clean OS install, official drivers, basic software bundle & tune-up' },
      { id: 'lap_ssd', name: 'Ultra-Fast 256GB / 512GB NVMe SSD Upgrade', minPrice: 1599, maxPrice: 2699, recommended: true, desc: 'Make old laptops boot in 5 seconds + OS transfer included' },
      { id: 'lap_ram', name: 'RAM Memory Upgrade (8GB / 16GB DDR4)', minPrice: 1250, maxPrice: 2200, recommended: false, desc: 'Lag-free multitasking, Chrome tabs, and Office performance' },
      { id: 'lap_thermal', name: 'Deep Internal Cleaning & Thermal Grizzly Repaste', minPrice: 550, maxPrice: 750, recommended: false, desc: 'Fix overheating, noisy fan, and unexpected auto-shutdowns' },
      { id: 'lap_screen', name: 'Broken Screen / Display Replacement (14" / 15.6" HD/FHD)', minPrice: 3200, maxPrice: 4800, recommended: false, desc: 'Original A+ grade brand panels (Dell, HP, Lenovo, Acer, Asus)' },
      { id: 'lap_keyboard', name: 'Keyboard / Trackpad Replacement', minPrice: 850, maxPrice: 1450, recommended: false, desc: 'Replacement for sticky, missing, or non-working laptop keys' },
      { id: 'lap_battery', name: 'Brand New Laptop Battery Replacement', minPrice: 1600, maxPrice: 2900, recommended: false, desc: '100% genuine backup battery with 1-Year manufacturer replacement warranty' }
    ]
  },
  desktop: {
    categoryName: 'Desktop Computer Repair & Upgrade',
    baseVisitCharge: 200,
    doorstepTime: '1 - 2 Hours at Doorstep in Boisar',
    warranty: 'Up to 3 Years Warranty on New Components',
    issues: [
      { id: 'desk_os', name: 'Windows OS Reinstall + Driver Setup + Data Backup', minPrice: 450, maxPrice: 600, recommended: true, desc: 'Full virus removal, clean Windows installation, and driver updates' },
      { id: 'desk_ssd', name: 'High-Speed SSD Upgrade (256GB / 512GB / 1TB)', minPrice: 1450, maxPrice: 3800, recommended: true, desc: 'Lightning fast system responsiveness for Office & Tally work' },
      { id: 'desk_smps', name: 'SMPS Power Supply Replacement (450W / 550W)', minPrice: 850, maxPrice: 1850, recommended: false, desc: 'Fix no-power, sudden restarts, and unstable power issues' },
      { id: 'desk_deepclean', name: 'Complete Cabinet De-Dusting & Thermal Repaste', minPrice: 450, maxPrice: 650, recommended: false, desc: 'High pressure dust blower cleaning + fresh thermal grease' },
      { id: 'desk_mobo_swap', name: 'Motherboard / Processor Hardware Replacement', minPrice: 3200, maxPrice: 6500, recommended: false, desc: 'Reliable replacement for dead non-chip level motherboards' },
      { id: 'desk_wifi', name: 'High-Gain Dual Band Wi-Fi & Bluetooth Card Install', minPrice: 650, maxPrice: 1200, recommended: false, desc: 'Add fast wireless connectivity to any desktop PC' }
    ]
  },
  printer: {
    categoryName: 'Printer Repair & Maintenance',
    baseVisitCharge: 200,
    doorstepTime: 'Same-Day Doorstep Service in Boisar',
    warranty: '100% Quality & Print Testing Assurance',
    issues: [
      { id: 'prn_cartridge', name: 'LaserJet Cartridge Refill & Drum Cleaning', minPrice: 350, maxPrice: 550, recommended: true, desc: 'Dark, crisp print output with premium quality toner powder' },
      { id: 'prn_paperjam', name: 'Paper Jam & Pickup Roller Rubber Fix', minPrice: 450, maxPrice: 750, recommended: true, desc: 'Fix multiple page feed, paper wrinkle, or pickup failure issues' },
      { id: 'prn_inktank', name: 'InkTank Head Cleaning & Air Purge Service', minPrice: 499, maxPrice: 799, recommended: false, desc: 'Resolve missing colors, streaky printing, and ink tube blockage' },
      { id: 'prn_network', name: 'Office Wi-Fi / LAN Network Printer Sharing Setup', minPrice: 400, maxPrice: 650, recommended: false, desc: 'Print wirelessly from multiple laptops, PCs, and smartphones' },
      { id: 'prn_teflon', name: 'Teflon Sleeve / Heating Element Replacement', minPrice: 750, maxPrice: 1250, recommended: false, desc: 'Fix paper sticking inside fuser unit and poor toner adhesion' }
    ]
  },
  custom_pc: {
    categoryName: 'Custom PC Assembly (Gaming & Office)',
    baseVisitCharge: 300,
    doorstepTime: 'Same-Day Build & Delivery in Boisar',
    warranty: '3 Years Comprehensive Brand Warranty',
    issues: [
      { id: 'build_office', name: 'Essential Office / Tally / Accounting Rig Assembly', minPrice: 18500, maxPrice: 28000, recommended: true, desc: 'Intel Core i3/i5 or Ryzen 3, 16GB RAM, 512GB SSD, Silent Cabinet' },
      { id: 'build_gaming_budget', name: '1080p Esports Gaming PC (GTA V, Valorant, CS2)', minPrice: 38000, maxPrice: 52000, recommended: true, desc: 'Intel i5 / Ryzen 5 + GTX 1650 / RTX 3050, 16GB RAM, High Airflow ARGB' },
      { id: 'build_gaming_pro', name: 'High-End 1440p / 4K Gaming & Video Editing Rig', minPrice: 65000, maxPrice: 125000, recommended: false, desc: 'Ryzen 7 / Intel i7 + RTX 4060 / 4070 Super, 32GB DDR5, 1TB Gen4 SSD' },
      { id: 'build_tarapur_cad', name: 'Tarapur Industrial 3D CAD / SolidWorks Workstation', minPrice: 55000, maxPrice: 95000, recommended: false, desc: 'High-stability workstation certified for 24/7 manufacturing plants' },
      { id: 'build_assembly_only', name: 'PC Assembly Only (Client Provides All Components)', minPrice: 999, maxPrice: 1499, recommended: false, desc: 'Precision assembly, cable management, BIOS setup & stress test' }
    ]
  },
  amc: {
    categoryName: 'Annual Maintenance Contract (AMC)',
    baseVisitCharge: 0,
    doorstepTime: 'Priority 90-Min Doorstep in Boisar & Tarapur',
    warranty: 'Unlimited Breakdown Calls & Quarterly Servicing',
    issues: [
      { id: 'amc_micro', name: 'Micro Office AMC (Up to 5 Computers & 1 Printer)', minPrice: 4500, maxPrice: 6500, recommended: true, desc: 'Quarterly preventive maintenance + unlimited emergency visits / year' },
      { id: 'amc_standard', name: 'Corporate Office / Clinic AMC (6 to 15 Systems)', minPrice: 8500, maxPrice: 14000, recommended: true, desc: 'Scheduled monthly checks, network maintenance & zero downtime assurance' },
      { id: 'amc_tarapur_midc', name: 'Tarapur MIDC Factory / Plant AMC (16+ Workstations)', minPrice: 16000, maxPrice: 28000, recommended: false, desc: 'Full IT infrastructure care, server backup monitoring, industrial reliability' }
    ]
  },
  ewaste: {
    categoryName: 'E-Waste Collection & Scrap Disposal',
    baseVisitCharge: 0,
    doorstepTime: 'Free Doorstep Scrap Pickup in Boisar & Tarapur MIDC',
    warranty: '100% Certified Eco-Friendly Recycling & Safe Disposal',
    issues: [
      { id: 'ewaste_pc', name: 'Old / Scrap Desktop PCs, Towers & Monitors', minPrice: 0, maxPrice: 0, recommended: true, desc: 'Eco-friendly collection of vintage CPUs, dead towers, TFT/CRT monitors & cabinets' },
      { id: 'ewaste_laptop', name: 'Broken / Dead Laptops & Adapters', minPrice: 0, maxPrice: 0, recommended: true, desc: 'Doorstep scrap pickup of broken laptops, motherboard scraps, non-working chargers' },
      { id: 'ewaste_printer', name: 'Defunct Printers, Scanners & Toners', minPrice: 0, maxPrice: 0, recommended: true, desc: 'Scrap pickup for HP, Canon, Epson printers, scanners, dry toners & cartridges' },
      { id: 'ewaste_mobo', name: 'Scrap Motherboards, Circuit PCBs & Electronics', minPrice: 0, maxPrice: 0, recommended: false, desc: 'Collection of circuit boards, RAM, graphics cards, SMPS, networking switches' },
      { id: 'ewaste_bulk', name: 'Tarapur MIDC Factory / Office Bulk E-Waste Clearance', minPrice: 0, maxPrice: 0, recommended: false, desc: 'Complete commercial e-waste clearance with vehicle pickup & fair scrap value' }
    ]
  }
};

function initRepairEstimator() {
  let selectedCategory = 'laptop';
  let selectedIssues = new Set(['lap_os', 'lap_ssd']);

  const categoryCards = document.querySelectorAll('.estimate-option-card');
  const issuesContainer = document.getElementById('estimatorIssuesList');
  const totalPriceElem = document.getElementById('estimateTotalAmount');
  const categorySummaryElem = document.getElementById('estimateSummaryCategory');
  const itemsCountElem = document.getElementById('estimateSelectedCount');
  const timeframeElem = document.getElementById('estimateTimeframe');
  const warrantyElem = document.getElementById('estimateWarranty');
  const waEstimateBtn = document.getElementById('btnWhatsAppEstimate');
  const callEstimateBtn = document.getElementById('btnCallEstimate');

  function renderIssues() {
    if (!issuesContainer) return;
    const catData = ESTIMATOR_DATA[selectedCategory];
    if (!catData) return;

    issuesContainer.innerHTML = '';

    const isEwaste = selectedCategory === 'ewaste';

    catData.issues.forEach(issue => {
      const isChecked = selectedIssues.has(issue.id);
      const itemEl = document.createElement('div');
      itemEl.className = `issue-pill-item ${isChecked ? 'active' : ''}`;
      itemEl.dataset.issueId = issue.id;

      const priceHtml = isEwaste
        ? `<div class="issue-pill-price text-success fw-bold">Free Pickup / Scrap Value</div><div class="text-muted" style="font-size: 0.72rem;">Eco Disposal</div>`
        : `<div class="issue-pill-price">₹${issue.minPrice.toLocaleString('en-IN')} - ₹${issue.maxPrice.toLocaleString('en-IN')}</div><div class="text-muted" style="font-size: 0.72rem;">Estimated Cost</div>`;

      itemEl.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <div class="form-check m-0">
            <input class="form-check-input issue-checkbox" type="checkbox" ${isChecked ? 'checked' : ''} id="check_${issue.id}">
          </div>
          <div>
            <div class="issue-pill-title">${issue.name} ${issue.recommended ? '<span class="badge bg-primary-subtle text-primary ms-1" style="font-size:0.7rem;">Popular</span>' : ''}</div>
            <div class="text-muted" style="font-size: 0.78rem;">${issue.desc}</div>
          </div>
        </div>
        <div class="text-end ps-3">
          ${priceHtml}
        </div>
      `;

      itemEl.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const chk = itemEl.querySelector('.issue-checkbox');
          chk.checked = !chk.checked;
        }
        toggleIssue(issue.id);
      });

      issuesContainer.appendChild(itemEl);
    });

    updateSummary();
  }

  function toggleIssue(issueId) {
    if (selectedIssues.has(issueId)) {
      selectedIssues.delete(issueId);
    } else {
      selectedIssues.add(issueId);
    }
    renderIssues();
  }

  function updateSummary() {
    const catData = ESTIMATOR_DATA[selectedCategory];
    if (!catData) return;

    let minTotal = 0;
    let maxTotal = 0;
    let selectedNames = [];

    catData.issues.forEach(issue => {
      if (selectedIssues.has(issue.id)) {
        minTotal += issue.minPrice;
        maxTotal += issue.maxPrice;
        selectedNames.push(issue.name);
      }
    });

    if (selectedIssues.size === 0) {
      if (selectedCategory === 'ewaste') {
        selectedNames.push('E-Waste Doorstep Collection / Scrap Inspection');
      } else {
        minTotal = catData.baseVisitCharge;
        maxTotal = catData.baseVisitCharge + 150;
        selectedNames.push('Doorstep Diagnostics & Inspection in Boisar');
      }
    }

    if (totalPriceElem) {
      if (selectedCategory === 'ewaste') {
        totalPriceElem.textContent = 'Free Pickup / Best Value';
      } else {
        totalPriceElem.textContent = `₹${minTotal.toLocaleString('en-IN')} - ₹${maxTotal.toLocaleString('en-IN')}`;
      }
    }
    if (categorySummaryElem) {
      categorySummaryElem.textContent = catData.categoryName;
    }
    if (itemsCountElem) {
      itemsCountElem.textContent = `${selectedIssues.size} Service(s) Selected`;
    }
    if (timeframeElem) {
      timeframeElem.textContent = catData.doorstepTime;
    }
    if (warrantyElem) {
      warrantyElem.textContent = catData.warranty;
    }

    const costText = selectedCategory === 'ewaste'
      ? 'Free Doorstep Pickup / Best Scrap Valuation'
      : `₹${minTotal.toLocaleString('en-IN')} - ₹${maxTotal.toLocaleString('en-IN')}`;

    const waText = encodeURIComponent(
      `Hello Sadguru Computers!\n\n` +
      `I checked the service options on your website:\n` +
      `📌 *Category*: ${catData.categoryName}\n` +
      `🔧 *Selected Items/Services*:\n- ${selectedNames.join('\n- ')}\n` +
      `💰 *Estimated Value/Cost*: ${costText}\n` +
      `📍 *Location*: Doorstep Service in Boisar / Tarapur\n\n` +
      `Please let me know when your team can schedule the visit/pickup.`
    );

    const whatsappNumber = '918149359795';
    if (waEstimateBtn) {
      waEstimateBtn.href = `https://wa.me/${whatsappNumber}?text=${waText}`;
    }

    if (callEstimateBtn) {
      callEstimateBtn.href = `tel:+918149359795`;
    }
  }

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedCategory = card.dataset.category;

      selectedIssues.clear();
      const defaultIssue = ESTIMATOR_DATA[selectedCategory].issues[0];
      if (defaultIssue) selectedIssues.add(defaultIssue.id);

      renderIssues();
    });
  });

  renderIssues();
}

/* ==========================================================================
   4. SMOOTH SCROLLING & ACTIVE SECTION HIGHLIGHT
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });
}
