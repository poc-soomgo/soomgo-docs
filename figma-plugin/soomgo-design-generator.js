// ============================================================
// 숨고 디자인 스페이스 자동 생성 Figma Plugin
// Figma > Plugins > Development > New Plugin > Run
// 이 코드를 code.ts에 붙여넣고 실행하세요
// ============================================================

// --- 컬러 팔레트 ---
const COLORS = {
  // 현재안 (Current)
  current: {
    primary: { r: 0, g: 0.71, b: 0.58 },         // #00B594
    primaryDark: { r: 0, g: 0.55, b: 0.45 },      // #008C73
    secondary: { r: 0.2, g: 0.2, b: 0.25 },       // #333340
    background: { r: 0.97, g: 0.97, b: 0.98 },    // #F8F8FA
    surface: { r: 1, g: 1, b: 1 },                 // #FFFFFF
    textPrimary: { r: 0.13, g: 0.13, b: 0.15 },   // #212126
    textSecondary: { r: 0.55, g: 0.55, b: 0.58 },  // #8C8C94
    accent: { r: 1, g: 0.78, b: 0 },               // #FFC700
    error: { r: 0.91, g: 0.22, b: 0.22 },          // #E83838
    warning: { r: 1, g: 0.58, b: 0 },              // #FF9400
  },
  // 컨셉 A: 프리미엄 모던
  conceptA: {
    primary: { r: 0.06, g: 0.09, b: 0.16 },       // #101728 다크 네이비
    primaryDark: { r: 0.04, g: 0.06, b: 0.12 },    // #0A0F1F
    secondary: { r: 0, g: 0.82, b: 0.67 },         // #00D1AB 민트 그린
    background: { r: 0.98, g: 0.98, b: 0.99 },     // #FAFAFE
    surface: { r: 1, g: 1, b: 1 },
    textPrimary: { r: 0.06, g: 0.09, b: 0.16 },
    textSecondary: { r: 0.45, g: 0.48, b: 0.55 },
    accent: { r: 0.4, g: 0.35, b: 1 },             // #6659FF 퍼플
    error: { r: 0.95, g: 0.26, b: 0.21 },
    warning: { r: 1, g: 0.65, b: 0.15 },
  },
  // 컨셉 B: 미니멀 클린
  conceptB: {
    primary: { r: 0, g: 0.62, b: 0.53 },          // #009E87 딥 티일
    primaryDark: { r: 0, g: 0.48, b: 0.41 },
    secondary: { r: 0.96, g: 0.96, b: 0.94 },     // #F5F5F0 웜 그레이
    background: { r: 1, g: 1, b: 0.99 },           // #FFFFFC
    surface: { r: 1, g: 1, b: 1 },
    textPrimary: { r: 0.1, g: 0.1, b: 0.1 },
    textSecondary: { r: 0.6, g: 0.6, b: 0.58 },
    accent: { r: 0.96, g: 0.65, b: 0.14 },         // #F5A623 골드
    error: { r: 0.84, g: 0.18, b: 0.18 },
    warning: { r: 0.98, g: 0.73, b: 0.25 },
  },
  // 컨셉 C: 다크모드 네이티브
  conceptC: {
    primary: { r: 0, g: 0.87, b: 0.71 },          // #00DEB5 밝은 그린
    primaryDark: { r: 0, g: 0.71, b: 0.58 },
    secondary: { r: 0.73, g: 0.55, b: 1 },         // #BB8CFF 라벤더
    background: { r: 0.07, g: 0.07, b: 0.09 },     // #121217
    surface: { r: 0.11, g: 0.11, b: 0.14 },        // #1C1C23
    textPrimary: { r: 0.95, g: 0.95, b: 0.97 },    // #F2F2F8
    textSecondary: { r: 0.6, g: 0.6, b: 0.65 },    // #9999A6
    accent: { r: 0, g: 0.87, b: 0.71 },
    error: { r: 1, g: 0.35, b: 0.35 },
    warning: { r: 1, g: 0.72, b: 0.25 },
  },
};

// --- 헬퍼 함수 ---
function createRect(parent, x, y, w, h, color, cornerRadius = 0, name = "Rectangle") {
  const rect = figma.createRectangle();
  rect.name = name;
  rect.x = x;
  rect.y = y;
  rect.resize(w, h);
  rect.fills = [{ type: "SOLID", color: color }];
  if (cornerRadius > 0) rect.cornerRadius = cornerRadius;
  parent.appendChild(rect);
  return rect;
}

function createText(parent, x, y, content, fontSize, color, fontWeight = "Regular", width = null) {
  const text = figma.createText();
  text.x = x;
  text.y = y;
  text.characters = content;
  text.fontSize = fontSize;
  text.fills = [{ type: "SOLID", color: color }];
  if (width) text.resize(width, text.height);
  parent.appendChild(text);
  return text;
}

// --- 페이지별 프레임 생성 ---
async function createDesignPage(pageName, palette, description) {
  const page = figma.createPage();
  page.name = pageName;

  // --- Cover Frame ---
  const cover = figma.createFrame();
  cover.name = "Cover";
  cover.resize(1440, 900);
  cover.x = 0;
  cover.y = 0;
  cover.fills = [{ type: "SOLID", color: palette.background }];
  page.appendChild(cover);

  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });

  // Title bar
  createRect(cover, 0, 0, 1440, 200, palette.primary, 0, "Header Bar");

  const title = createText(cover, 80, 60, pageName, 48, { r: 1, g: 1, b: 1 }, "Bold");
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  title.fontName = { family: "Inter", style: "Bold" };

  const desc = createText(cover, 80, 130, description, 18, { r: 1, g: 1, b: 1, a: 0.8 }, "Regular");
  desc.fontName = { family: "Inter", style: "Regular" };

  // --- Color Palette Section ---
  const paletteFrame = figma.createFrame();
  paletteFrame.name = "Color Palette";
  paletteFrame.resize(1440, 300);
  paletteFrame.x = 0;
  paletteFrame.y = 250;
  paletteFrame.fills = [{ type: "SOLID", color: palette.background }];
  page.appendChild(paletteFrame);

  const colorNames = Object.keys(palette);
  let cx = 40;
  for (const colorName of colorNames) {
    createRect(paletteFrame, cx, 60, 100, 100, palette[colorName], 16, colorName);
    const label = createText(paletteFrame, cx, 170, colorName, 12, palette.textPrimary, "Regular");
    label.fontName = { family: "Inter", style: "Regular" };
    cx += 130;
  }

  const sectionTitle = createText(paletteFrame, 40, 20, "Color System", 24, palette.textPrimary, "Bold");
  sectionTitle.fontName = { family: "Inter", style: "Bold" };

  // --- Mobile Screens (iPhone + Android side by side) ---
  // iPhone Frame (393 x 852)
  const iphoneFrame = figma.createFrame();
  iphoneFrame.name = "iPhone 17 - Home";
  iphoneFrame.resize(393, 852);
  iphoneFrame.x = 0;
  iphoneFrame.y = 600;
  iphoneFrame.fills = [{ type: "SOLID", color: palette.background }];
  iphoneFrame.cornerRadius = 44;
  iphoneFrame.clipsContent = true;
  page.appendChild(iphoneFrame);

  // Status bar
  createRect(iphoneFrame, 0, 0, 393, 54, palette.surface, 0, "Status Bar");

  // Nav bar
  createRect(iphoneFrame, 0, 54, 393, 56, palette.surface, 0, "Nav Bar");
  const navTitle = createText(iphoneFrame, 20, 68, "숨고", 22, palette.primary, "Bold");
  navTitle.fontName = { family: "Inter", style: "Bold" };

  // Hero Banner
  createRect(iphoneFrame, 0, 110, 393, 180, palette.primary, 0, "Hero Banner");
  const heroText = createText(iphoneFrame, 24, 130, "어떤 서비스가\n필요하세요?", 26, { r: 1, g: 1, b: 1 }, "Bold");
  heroText.fontName = { family: "Inter", style: "Bold" };

  // Search bar on hero
  createRect(iphoneFrame, 20, 240, 353, 44, palette.surface, 12, "Search Bar");
  const searchPlaceholder = createText(iphoneFrame, 44, 252, "서비스를 검색하세요", 14, palette.textSecondary, "Regular");
  searchPlaceholder.fontName = { family: "Inter", style: "Regular" };

  // Category Grid (2 rows x 4 cols)
  const categories = ["인테리어", "수리", "운동", "음악", "과외", "사진", "뷰티", "더보기"];
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = 24 + col * 90;
    const by = 310 + row * 85;
    createRect(iphoneFrame, bx + 14, by, 52, 52, palette.primary, 26, `Cat Icon ${categories[i]}`);
    // Reduce opacity for icon bg
    const catLabel = createText(iphoneFrame, bx + 8, by + 58, categories[i], 11, palette.textPrimary, "Regular");
    catLabel.fontName = { family: "Inter", style: "Regular" };
  }

  // Service Cards (horizontal scroll mockup)
  for (let i = 0; i < 2; i++) {
    const sx = 20 + i * 175;
    createRect(iphoneFrame, sx, 500, 165, 140, palette.surface, 16, `Service Card ${i + 1}`);
    createRect(iphoneFrame, sx, 500, 165, 80, palette.primary, 16, `Service Image ${i + 1}`);
    const cardTitle = createText(iphoneFrame, sx + 12, 590, i === 0 ? "인테리어 시공" : "이사 청소", 13, palette.textPrimary, "Semi Bold");
    cardTitle.fontName = { family: "Inter", style: "Semi Bold" };
    const cardRating = createText(iphoneFrame, sx + 12, 610, i === 0 ? "★ 4.9  리뷰 2,847" : "★ 4.8  리뷰 5,123", 11, palette.textSecondary, "Regular");
    cardRating.fontName = { family: "Inter", style: "Regular" };
  }

  // Bottom Tab Bar
  createRect(iphoneFrame, 0, 768, 393, 84, palette.surface, 0, "Tab Bar");
  const tabs = ["홈", "검색", "내 요청", "채팅", "내 정보"];
  for (let i = 0; i < 5; i++) {
    const tx = 20 + i * 75;
    const isActive = i === 0;
    createRect(iphoneFrame, tx + 20, 780, 24, 24, isActive ? palette.primary : palette.textSecondary, 4, `Tab Icon ${tabs[i]}`);
    const tabLabel = createText(iphoneFrame, tx + 10, 808, tabs[i], 10, isActive ? palette.primary : palette.textSecondary, "Regular");
    tabLabel.fontName = { family: "Inter", style: "Regular" };
  }

  // --- Android Frame (412 x 915 - Galaxy Fold unfolded main) ---
  const androidFrame = figma.createFrame();
  androidFrame.name = "Galaxy Z Fold 7 - Home";
  androidFrame.resize(600, 900);
  androidFrame.x = 450;
  androidFrame.y = 600;
  androidFrame.fills = [{ type: "SOLID", color: palette.background }];
  androidFrame.cornerRadius = 24;
  androidFrame.clipsContent = true;
  page.appendChild(androidFrame);

  // Status bar
  createRect(androidFrame, 0, 0, 600, 40, palette.surface, 0, "Status Bar");

  // Top App Bar
  createRect(androidFrame, 0, 40, 600, 56, palette.surface, 0, "Top App Bar");
  const androidTitle = createText(androidFrame, 20, 52, "숨고", 22, palette.primary, "Bold");
  androidTitle.fontName = { family: "Inter", style: "Bold" };

  // Hero Banner (wider for fold)
  createRect(androidFrame, 0, 96, 600, 200, palette.primary, 0, "Hero Banner");
  const androidHeroText = createText(androidFrame, 32, 120, "어떤 서비스가\n필요하세요?", 28, { r: 1, g: 1, b: 1 }, "Bold");
  androidHeroText.fontName = { family: "Inter", style: "Bold" };

  // Search bar
  createRect(androidFrame, 24, 250, 552, 44, palette.surface, 12, "Search Bar");
  const androidSearch = createText(androidFrame, 52, 262, "서비스를 검색하세요", 14, palette.textSecondary, "Regular");
  androidSearch.fontName = { family: "Inter", style: "Regular" };

  // Category Grid (wider - 2 rows x 4 cols, bigger)
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = 40 + col * 135;
    const by = 320 + row * 90;
    createRect(androidFrame, bx + 20, by, 56, 56, palette.primary, 28, `Cat Icon ${categories[i]}`);
    const catLabel = createText(androidFrame, bx + 14, by + 62, categories[i], 12, palette.textPrimary, "Regular");
    catLabel.fontName = { family: "Inter", style: "Regular" };
  }

  // Service Cards (3 columns for fold screen)
  for (let i = 0; i < 3; i++) {
    const sx = 24 + i * 186;
    createRect(androidFrame, sx, 520, 174, 150, palette.surface, 16, `Service Card ${i + 1}`);
    createRect(androidFrame, sx, 520, 174, 85, palette.primary, 16, `Service Image ${i + 1}`);
    const names = ["인테리어 시공", "이사 청소", "에어컨 청소"];
    const ratings = ["★ 4.9  2,847", "★ 4.8  5,123", "★ 4.9  3,456"];
    const aCardTitle = createText(androidFrame, sx + 12, 615, names[i], 13, palette.textPrimary, "Semi Bold");
    aCardTitle.fontName = { family: "Inter", style: "Semi Bold" };
    const aCardRating = createText(androidFrame, sx + 12, 635, ratings[i], 11, palette.textSecondary, "Regular");
    aCardRating.fontName = { family: "Inter", style: "Regular" };
  }

  // Bottom Navigation
  createRect(androidFrame, 0, 820, 600, 80, palette.surface, 0, "Bottom Navigation");
  for (let i = 0; i < 5; i++) {
    const tx = 30 + i * 114;
    const isActive = i === 0;
    createRect(androidFrame, tx + 20, 832, 24, 24, isActive ? palette.primary : palette.textSecondary, 4, `Nav Icon ${tabs[i]}`);
    const navLabel = createText(androidFrame, tx + 8, 860, tabs[i], 11, isActive ? palette.primary : palette.textSecondary, "Regular");
    navLabel.fontName = { family: "Inter", style: "Regular" };
  }

  return page;
}

// --- 메인 실행 ---
async function main() {
  // 페이지 4개 생성
  await createDesignPage(
    "현재안 - Current Design",
    COLORS.current,
    "숨고 현재 브랜드 디자인 시스템 (#00B594 기반)"
  );

  await createDesignPage(
    "컨셉 A - Premium Modern",
    COLORS.conceptA,
    "다크 네이비 + 민트 그린 + 퍼플 악센트 / 프리미엄 서비스 지향"
  );

  await createDesignPage(
    "컨셉 B - Minimal Clean",
    COLORS.conceptB,
    "딥 티일 + 웜 그레이 + 골드 / 미니멀리즘 & 신뢰감"
  );

  await createDesignPage(
    "컨셉 C - Dark Native",
    COLORS.conceptC,
    "다크 배경 + 네온 그린 + 라벤더 / 트렌디한 다크모드 네이티브"
  );

  // 기존 Page 1 삭제 (빈 페이지)
  const pages = figma.root.children;
  for (const p of pages) {
    if (p.name === "Page 1" && p.children.length === 0) {
      p.remove();
      break;
    }
  }

  figma.closePlugin("숨고 디자인 스페이스 4개 페이지 생성 완료!");
}

main();
