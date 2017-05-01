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
	if(panelOpen)
	{
		cosmeticsPanel.GetComponent(IsPanelOpen).CloseAll();
		panelOpen = false;
	}
	else
	{
		cosmeticsPanel.GetComponent(IsPanelOpen).CloseAll();
		panelOpen = true;
	}
    sailsPanel.SetActive(panelOpen);
    boatToShowSails.SetActive(panelOpen);
  //  zoneText.SetActive(!panelOpen);
    boatToShowSails.transform.position = boatPosition;
    boatToShowSails.transform.rotation = Quaternion.Euler(boatRotation);
}

