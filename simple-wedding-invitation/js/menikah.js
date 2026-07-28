// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  var toTopButton = document.getElementById("toTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.classList.add("is-visible");
  } else {
    toTopButton.classList.remove("is-visible");
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");

  var $attendanceRadios = $("input[name='attendance']");
  var $guestCount = $("#guest-count");

  function updateGuestCount() {
    var attendance = $("input[name='attendance']:checked").val();
    if (attendance === "No") {
      $guestCount.val(0).prop("readonly", true);
    } else {
      $guestCount.prop("readonly", false);
      if (!$guestCount.val() || Number($guestCount.val()) === 0) {
        $guestCount.val(1);
      }
    }
  }

  function normalizeGuestName(rawName) {
    if (!rawName) {
      return "";
    }
    var name = decodeURIComponent(rawName.replace(/\+/g, " "));
    name = name.replace(/[-_]+/g, " ").trim();
    name = name.replace(/([a-z])([A-Z])/g, "$1 $2");
    return name;
  }

  function getGuestNameFromUrl() {
    var path = window.location.pathname || "";
    var segments = path.split("/").filter(function(segment) {
      return segment !== "";
    });
    if (segments.length === 0) {
      return "";
    }
    var lastSegment = segments[segments.length - 1];
    if (lastSegment.toLowerCase() === "index.html" && segments.length > 1) {
      lastSegment = segments[segments.length - 2];
    }
    if (!lastSegment || lastSegment.toLowerCase() === "index.html") {
      return "";
    }
    return normalizeGuestName(lastSegment);
  }

  function fillGuestName() {
    var guestName = getGuestNameFromUrl();
    if (!guestName) {
      return;
    }
    var $nameInput = $("input[name='name']");
    if ($nameInput.length && !$nameInput.val().trim()) {
      $nameInput.val(guestName);
    }
    $(".guest-name-placeholder").text(guestName);
  }

  $attendanceRadios.on("change", updateGuestCount);
  updateGuestCount();
  fillGuestName();
});
$(window).load(function() {
  var Body = $("body");
  Body.addClass("preloader-site");
});
