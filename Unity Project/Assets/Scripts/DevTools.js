#pragma strict

function DeletePlayerPrefs()
{
	PlayerPrefs.DeleteAll();
}
function UnlockAllZones()
{
	LevelSelect.zoneUnlocked = 999999999;
}