#pragma strict
public var sailsPanel: GameObject;
public var boatToShowSails: GameObject;
public var zoneText: GameObject;
public var panelOpen: boolean;

function SailsButton ()
{
    panelOpen = !panelOpen;
    sailsPanel.SetActive(panelOpen);
    boatToShowSails.SetActive(panelOpen);
    zoneText.SetActive(!panelOpen);
}