#pragma strict

public var sailsPanel: GameObject;
public var boatToShowSails: GameObject;
public var zoneText: GameObject;
public var panelOpen: boolean;
public var boatPosition: Vector3;
public var boatRotation: Vector3;
public var cosmeticsPanel: GameObject;

function SailsButton ()
{
	cosmeticsPanel.GetComponent(IsPanelOpen).CloseAll();
    panelOpen = !panelOpen;
    sailsPanel.SetActive(panelOpen);
    boatToShowSails.SetActive(panelOpen);
    zoneText.SetActive(!panelOpen);
    boatToShowSails.transform.position = boatPosition;
    boatToShowSails.transform.rotation = Quaternion.Euler(boatRotation);
}

