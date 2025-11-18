// Inicializar contador de pontos no cabeçalho
document.addEventListener('DOMContentLoaded', function() {
  const pointsDisplay = document.getElementById('points-display');
  if (pointsDisplay) {
    pointsDisplay.textContent = 'Pontos: 0/105';
  }
});

// Verificar se o usuário já participou do quiz
if (localStorage.getItem('participouQuizMovitel') === 'true') {
  alert('⚠️ Você já participou do questionário. Finalize o pagamento para receber o seu prêmio!');
  showPaymentInstructions();
} else {
  showWelcome();
  localStorage.setItem('participouQuizMovitel', 'true');
}