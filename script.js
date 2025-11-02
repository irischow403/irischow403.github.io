// Helper function to draw text
function drawText(ctx, text, x, y, fontSize, color, align = 'left', baseline = 'top') {
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px 'Segoe UI', sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
}

// Monthly Sales Performance Chart
function drawSalesChart() {
    const canvas = document.getElementById('salesChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [45, 52, 58, 65, 70, 75, 82, 88, 92, 95, 110, 125];
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = Math.round(maxValue - (maxValue / 5) * i);
        drawText(ctx, value.toString(), padding - 10, y, 12, '#666', 'right', 'middle');
    }
    
    // Draw line chart
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const stepX = chartWidth / (data.length - 1);
    
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under line
    ctx.lineTo(width - padding, padding + chartHeight);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
    ctx.fill();
    
    // Draw points
    data.forEach((value, index) => {
        const x = padding + stepX * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // X-axis labels
        drawText(ctx, labels[index], x, height - padding + 10, 12, '#666', 'center', 'top');
    });
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Title
    drawText(ctx, 'Sales ($1000s)', 20, 20, 14, '#667eea', 'left', 'top');
}

// Product Category Distribution Chart
function drawCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 - 100;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    // Data
    const labels = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'];
    const data = [35, 25, 20, 12, 8];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw pie slices
    let currentAngle = -Math.PI / 2;
    const total = data.reduce((a, b) => a + b, 0);
    
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = width - 200;
    const legendY = 50;
    const legendItemHeight = 30;
    
    data.forEach((value, index) => {
        // Color box
        ctx.fillStyle = colors[index];
        ctx.fillRect(legendX, legendY + index * legendItemHeight, 20, 20);
        
        // Label
        drawText(ctx, `${labels[index]}: ${value}%`, legendX + 30, legendY + index * legendItemHeight, 14, '#333', 'left', 'top');
    });
}

// Customer Satisfaction Ratings Chart
function drawSatisfactionChart() {
    const canvas = document.getElementById('satisfactionChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Data
    const labels = ['Product Quality', 'Shipping Speed', 'Customer Service', 'Value for Money'];
    const data = [4.5, 4.2, 4.3, 4.0];
    const maxValue = 5;
    const colors = ['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)', 'rgba(240, 147, 251, 0.8)', 'rgba(79, 172, 254, 0.8)'];
    const borderColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        const y = padding + (chartHeight / 10) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        if (i % 2 === 0) {
            const value = (maxValue - (maxValue / 10) * i).toFixed(1);
            drawText(ctx, value, padding - 10, y, 12, '#666', 'right', 'middle');
        }
    }
    
    // Draw bars
    const barWidth = chartWidth / (data.length * 2);
    const barSpacing = chartWidth / data.length;
    
    data.forEach((value, index) => {
        const x = padding + barSpacing * index + barWidth / 2;
        const barHeight = (value / maxValue) * chartHeight;
        const y = padding + chartHeight - barHeight;
        
        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw border
        ctx.strokeStyle = borderColors[index];
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);
        
        // Draw value on top
        drawText(ctx, value.toFixed(1), x + barWidth / 2, y - 10, 14, '#333', 'center', 'bottom');
        
        // X-axis labels
        const labelX = x + barWidth / 2;
        const words = labels[index].split(' ');
        words.forEach((word, wordIndex) => {
            drawText(ctx, word, labelX, height - padding + 15 + wordIndex * 15, 11, '#666', 'center', 'top');
        });
    });
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Title
    drawText(ctx, 'Rating (out of 5)', 20, 20, 14, '#667eea', 'left', 'top');
}

// Initialize all charts when page loads
window.addEventListener('load', function() {
    drawSalesChart();
    drawCategoryChart();
    drawSatisfactionChart();
});

// Redraw charts on window resize
window.addEventListener('resize', function() {
    drawSalesChart();
    drawCategoryChart();
    drawSatisfactionChart();
});

