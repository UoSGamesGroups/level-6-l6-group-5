using UnityEngine;
using UnityEditor;
using NUnit.Framework;

public class NewEditorTest {

	[MenuItem("Open Scene/Boss")]
	public static void OpenBoss() {
		
		OpenScene("Boss");
	}

	[MenuItem("Open Scene/Level Select")]
	public static void OpenLevelSelect() {

		OpenScene("LevelSelect");
	}

	[MenuItem("Open Scene/Exploration")]
	public static void OpenExploration() {

		OpenScene("runner");
	}
	public static void OpenScene(string name)
	{
		if(EditorApplication.SaveCurrentSceneIfUserWantsTo())
		{
			EditorApplication.OpenScene("Assets/Scenes/" + name + ".unity");
		}
	}
}
