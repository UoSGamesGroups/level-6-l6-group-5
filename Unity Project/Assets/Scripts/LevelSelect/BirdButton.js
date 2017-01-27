#pragma strict

public var birdPanel: GameObject;
public var boatToShowBird: GameObject;
public var zoneText: GameObject;
public var panelOpen: boolean;
public var boatPosition: Vector3;
public var boatRotation: Vector3;
public var cosmeticsPanel: GameObject;

function BirdButton ()
{
	cosmeticsPanel.GetComponent(IsPanelOpen).CloseAll();
    panelOpen = !panelOpen;
    birdPanel.SetActive(panelOpen);
    boatToShowBird.SetActive(panelOpen);
    zoneText.SetActive(!panelOpen);
    boatToShowBird.transform.position = boatPosition;
    boatToShowBird.transform.rotation = Quaternion.Euler(boatRotation);
}