const { app, Menu, Tray } = require('electron');
const path = require('path');
const { BrowserWindow } = require('electron');

const { menubar } = require('menubar');
const { clipboard, nativeTheme } = require('electron');

const nogglesList = [
	'⌐◧-◧',
	'⌐◨-◨',
	'⌐⁞⁚⁞-⁞⁚⁞',
	'⌐◫-◫',
	'⌐◪-◪',
	'⌐◮-◮',
	'⌐♥-♥',
	'⌐🄶-🄼',
	'⌐ⓝ°ⓒ',
	'separator',
	'⌐×-×'
];

app.on('ready', () => {
	const getTrayIcon = (isDark = nativeTheme.shouldUseDarkColors) => {
		return path.join(EXTRA_RESOURCES_PATH, `icon${isDark ? '-dark' : ''}.png`);
	};

	const EXTRA_RESOURCES_PATH = app.isPackaged
		? path.join(process.resourcesPath, 'assets')
		: path.join(__dirname, 'assets');

	const quitApp = () => {
		app.quit();
	};

	const copyNoggles = (text) => {
		clipboard.writeText(text);
	};
	const menuItems = nogglesList.map((nog, i, { length }) =>
		length - 2 === i
			? {
					type: 'separator',
			  }
			: length - 1 === i
			? {
					label: '⌐×-×',
					click: function () {
						quitApp();
					},
			  }
			: {
					label: nog,
					click: function () {
						copyNoggles(nog);
					},
			  }
	);
	const tray = new Tray(getTrayIcon());
	const contextMenu = Menu.buildFromTemplate(menuItems);
	tray.setContextMenu(contextMenu);
	const mb = menubar({
		tray,
	});

	mb.on('ready', () => {
		// Don't open browser window
		tray.removeAllListeners();
		nativeTheme.on('updated', () => mb.tray.setImage(getTrayIcon()));
	});
});
