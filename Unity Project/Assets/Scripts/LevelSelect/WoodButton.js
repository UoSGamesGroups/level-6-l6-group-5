#pragma strict

public var woodPanel: GameObject;
public var boatToShowWood: GameObject;
public var zoneText: GameObject;
public var panelOpen: boolean;
public var boatPosition: Vector3;
public var boatRotation: Vector3;
public var cosmeticsPanel: GameObject;

function WoodButton ()
{
	cosmeticsPanel.GetComponent(IsPanelOpen).CloseAll();
    panelOpen = !panelOpen;
    woodPanel.SetActive(panelOpen);
    boatToShowWood.SetActive(panelOpen);
    zoneText.SetActive(!panelOpen);
    boatToShowWood.transform.position = boatPosition;
    boatToShowWood.transform.rotation = Quaternion.Euler(boatRotation);
}