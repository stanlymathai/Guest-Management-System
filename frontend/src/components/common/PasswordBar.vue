<template>
  <div>
    <div class="progress bg-transparent">
      <div
        :class="progressClass"
        role="progressbar"
        :style="{ width: strengthValue + '%' }"
        aria-valuenow="strength"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ strength }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      strength: "",
      progressClass:
        "progress-bar progress-bar-striped progress-bar-animated bg-danger",
    };
  },

  computed: {
    strengthValue() {
      let pass = this.password;
      let score = 0;
      if (!pass) return score;

      // award every unique letter until 5 repetitions
      let letters = new Object();
      for (let i = 0; i < pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
      }

      // bonus points for mixing it up
      let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
      };

      let variationCount = 0;
      for (let check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
      }
      score += (variationCount - 1) * 10;
      let passwordCheck =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // Minimum eight characters, at least one letter, one number and one special character
      let finalScore = parseInt(score) > 100 ? 100 : parseInt(score);
      function between(min, max) {
        return finalScore >= min && finalScore <= max;
      }
      if (between(80, 100) || passwordCheck.test(pass)) {
        this.strength = finalScore == 100 ? "Very Strong" : "Strong";
        this.progressClass = this.progressClass.slice(0, 59) + "success";
      } else if (between(60, 80)) {
        this.strength = "Moderate";
        this.progressClass = this.progressClass.slice(0, 59) + "primary";
      } else if (between(30, 60)) {
        this.strength = "Weak";
        this.progressClass = this.progressClass.slice(0, 59) + "secondary";
      } else if (between(18, 30)) {
        this.strength = "Very Weak";
        this.progressClass = this.progressClass.slice(0, 59) + "warning";
      } else {
        this.strength = "";
        this.progressClass = this.progressClass.slice(0, 59) + "danger";
      }
      return finalScore;
    },
  },
};
</script>
