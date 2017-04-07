#pragma strict

public var panel: GameObject;
public var visibility: boolean;
public var isCosmetic: boolean;
public var isUpgrades: boolean;
public var controller: GameObject;
public var CloseAllButton: GameObject;

function Start()
{
	if(isCosmetic)
	{
		panel.GetComponent(IsPanelOpen).OpenAll();
		yield WaitForSeconds(0.01);
		panel.GetComponent(IsPanelOpen).CloseAll();
		panel.SetActive(false);
	}
}

function ChestOpened()
{
	panel.SetActive(false);
	visibility = false;
}

function Clicked () 
{
	if(controller.GetComponent(UIOpen).ui == null)
	{
		Debug.Log("1");
		controller.GetComponent(UIOpen).ui = panel;
		controller.GetComponent(UIOpen).button = this.gameObject;
	}
	else if(controller.GetComponent(UIOpen).ui.name == "btn_upgrades")
	{
		var openUICosmetics :GameObject;
		var openButtonCosmetics :GameObject;

		Debug.Log("2");
		openUICosmetics = controller.GetComponent(UIOpen).ui;
		openButtonCosmetics = controller.GetComponent(UIOpen).button;

		openButtonCosmetics.GetComponent(Upgrades).visibility = false;
		openUICosmetics.SetActive(false);

		controller.GetComponent(UIOpen).ui = panel;
		controller.GetComponent(UIOpen).button = this.gameObject;
	}
	else if(controller.GetComponent(UIOpen).button != this.gameObject)
	{
		var openUI :GameObject;
		var openButton :GameObject;

		openUI = controller.GetComponent(UIOpen).ui;
		openButton = controller.GetComponent(UIOpen).button;

		if(openUI.name == "CosmeticsPanel")
		{
			openUI.GetComponent(IsPanelOpen).CloseAll();
		}
		Debug.Log("3");

		if(openUI.name == "btn_upgrades")
		{
			openButton.GetComponent(Upgrades).visibility = false;
			openUI.SetActive(false);
		}
		else if(this.gameObject.name == "btn_upgrades")
		{
			this.gameObject.GetComponent(Upgrades).visibility = false;
		}

		openButton.GetComponent(ShowPanel).visibility = false;
		openUI.SetActive(false);

		controller.GetComponent(UIOpen).ui = panel;
		controller.GetComponent(UIOpen).button = this.gameObject;
	}

	if(!isCosmetic && !isUpgrades)
	{
		visibility = !visibility;
		panel.SetActive(visibility);
		CloseAllButton.SetActive (visibility);
	}
	else if(isCosmetic)
	{
		panel.GetComponent(IsPanelOpen).CloseAll();
		visibility = !visibility;
		panel.SetActive(visibility);
		CloseAllButton.SetActive (visibility);
	}
}