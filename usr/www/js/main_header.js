function update_item(selected_item)
{
  // small item
  var a_arr = document.getElementsByTagName("a");
  for (i = 0; i < a_arr.length; i++) {
    var span_arr = a_arr[i].getElementsByTagName("span");
    if (span_arr[0].className == "selected_item") {
      span_arr[0].className = "";
    }
  }

  selected_item.className = "selected_item";

  // navigation bar
  var target_page = selected_item.parentNode.href;
  var navigation_small_item = document.getElementById("navigation_small_item");
  navigation_small_item.onclick = function() {
    top.bodyFrame.mainFrame.rightFrame.mainContentFrame.location=target_page;
  };
  navigation_small_item.innerHTML = selected_item.innerHTML;
}